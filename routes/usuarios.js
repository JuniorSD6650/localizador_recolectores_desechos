const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();
const { format } = require('date-fns');
const protect = require('../middleware/auth');  // Middleware de protección

const fs = require('fs');
const multer = require('multer');
const ExcelJS = require('exceljs');

// Configuración de multer para la carga temporal de archivos
const upload = multer({ dest: 'public/uploads/' });

const USUARIO_COLUMNS = [
  { header: 'Username', key: 'username', width: 30 },
  { header: 'Password', key: 'password', width: 30 },
  { header: 'Recolector ID', key: 'recolector_id', width: 20 },
];

// Ruta para descargar la plantilla de usuarios
router.get('/template', async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Plantilla Usuarios');

    worksheet.columns = USUARIO_COLUMNS;
    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=Plantilla_Usuarios.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Error al generar la plantilla', details: error.message });
  }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    let usuarios = await knex('usuarios')
      .select(
        'usuarios.id',
        'usuarios.username',
        'usuarios.role',
        'usuarios.created_at',
        'usuarios.recolector_id',
        'recolectores_desechos.nombre_recolector'
      )
      .leftJoin('recolectores_desechos', 'usuarios.recolector_id', 'recolectores_desechos.id')
      .whereNot('usuarios.role', 'admin') // Excluir usuarios con rol admin
      .orderBy('usuarios.id', 'desc');

    usuarios = usuarios.map(usuario => ({
      ...usuario,
      created_at: usuario.created_at
        ? format(new Date(usuario.created_at), 'dd/MM/yyyy HH:mm:ss')
        : null
    }));

    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo los usuarios.', details: error.message || error });
  }
});

// Ruta para obtener el administrador
router.get('/admin', async (req, res) => {
  try {
    const admin = await knex('usuarios').where('role', 'admin').first();
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado.' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo el administrador.' });
  }
});

router.get('/:id', protect(), async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta al usuario con los datos adicionales
    const user = await knex('usuarios')
      .select(
        'usuarios.username',
        'usuarios.role',
        'usuarios.recolector_id',
        'recolectores_desechos.nombre_recolector',
        'recolectores_desechos.ubicacion_enlace',
        'recolectores_desechos.fecha_ubicacion_actualizada'
      )
      .leftJoin('recolectores_desechos', 'usuarios.recolector_id', 'recolectores_desechos.id')
      .where('usuarios.id', id)
      .first();

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({
      username: user.username,
      role: user.role,
      recolector_id: user.recolector_id,
      nombre_recolector: user.nombre_recolector,
      ubicacion_enlace: user.ubicacion_enlace,
      fecha_ubicacion_actualizada: user.fecha_ubicacion_actualizada,
    });
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    res.status(500).json({ message: 'Error interno al obtener el perfil del usuario.' });
  }
});

// Cargar datos por excel
router.post('/bulk-upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet(1);
    const failedRecords = [];

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const record = {
        username: row.getCell(1).value?.toString().trim() || null,
        password: row.getCell(2).value?.toString().trim() || null,
        recolector_id: row.getCell(3).value ? parseInt(row.getCell(3).value) : null,
        created_at: row.getCell(4).value ? row.getCell(4).value.toISOString() : knex.fn.now(),
      };

      if (!record.username || !record.password || !record.recolector_id) {
        console.warn(`Fila ${i} ignorada: faltan campos obligatorios.`);
        continue;
      }

      try {
        // Aquí no insertamos los datos, solo los extraemos
        console.log(`Usuario temporal procesado: ${record.username}, Recolector ID: ${record.recolector_id}`);
      } catch (error) {
        console.error(`Error en fila ${i}:`, error.message);
        failedRecords.push(record);
      }
    }

    // Elimina el archivo temporal después de procesarlo
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error eliminando archivo temporal:', err.message);
      } else {
        console.log('Archivo temporal eliminado:', req.file.path);
      }
    });

    // Si hubo errores, generar un archivo con los errores
    if (failedRecords.length > 0) {
      const failedWorkbook = new ExcelJS.Workbook();
      const failedWorksheet = failedWorkbook.addWorksheet('Errores');

      failedWorksheet.columns = USUARIO_COLUMNS;
      failedWorksheet.getRow(1).font = { bold: true };

      failedRecords.forEach((record) => {
        failedWorksheet.addRow(record);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=Errores_Carga_Usuarios.xlsx'
      );

      await failedWorkbook.xlsx.write(res);
      return res.end();
    }

    res.status(200).json({ message: 'Datos extraídos correctamente, archivo procesado.' });
  } catch (err) {
    console.error('Error al procesar el archivo:', err.message);

    // Elimina el archivo si hubo un error
    fs.unlink(req.file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error eliminando archivo temporal:', unlinkErr.message);
      }
    });

    res.status(500).json({ error: 'Error al procesar el archivo', details: err.message });
  }
});

// Ruta para crear un administrador
router.post('/admin', async (req, res) => {
  const { username, password, email, phone } = req.body;

  try {
    const existingAdmin = await knex('usuarios').where('role', 'admin').first();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Ya existe un administrador.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await knex('usuarios').insert({
      username,
      password: hashedPassword,
      role: 'admin',
      email,
      phone,
      created_at: knex.fn.now()
    });

    res.status(201).json({ message: 'Administrador creado exitosamente', adminId: newAdmin[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando el administrador.' });
  }
});

// Ruta para el login del administrador
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex('usuarios').where('username', username).first();

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      recolectorId: user.recolector_id || null,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "secretkey", {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: 'Login exitoso',
      token,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el login del usuario.' });
  }
});

// Ruta para añadir usuarios
router.post('/', async (req, res) => {
  const { username, password, recolector_id } = req.body;

  try {
    // Validar si recolector_id existe en la tabla recolectores_desechos
    if (recolector_id) {
      const recolector = await knex('recolectores_desechos').where('id', recolector_id).first();
      if (!recolector) {
        return res.status(400).json({ message: 'El recolector_id proporcionado no es válido.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario y obtener el ID
    const [newUserId] = await knex('usuarios').insert({
      username,
      password: hashedPassword,
      role: 'localizador',
      recolector_id: recolector_id || null,
      created_at: knex.fn.now()
    });

    // Realizar una consulta adicional para recuperar los datos completos del usuario recién creado
    const newUser = await knex('usuarios')
      .select(
        'usuarios.id',
        'usuarios.username',
        'usuarios.role',
        'usuarios.created_at',
        'usuarios.recolector_id',
        'recolectores_desechos.nombre_recolector'
      )
      .leftJoin('recolectores_desechos', 'usuarios.recolector_id', 'recolectores_desechos.id')
      .where('usuarios.id', newUserId)
      .first();

    // Enviar los datos completos como respuesta
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando el usuario.', details: error.message || error });
  }
});

// Ruta para editar usuarios
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, role, recolector_id } = req.body;

  try {
    const user = await knex('usuarios').where('id', id).first();
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const updatedUser = {
      username: username || user.username,
      role: role || user.role,
      recolector_id: role === 'localizador' ? recolector_id : null
    };

    if (password) {
      updatedUser.password = await bcrypt.hash(password, 10);
    }

    await knex('usuarios').where('id', id).update(updatedUser);

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando el usuario.' });
  }
});

// Ruta para eliminar un usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await knex('usuarios').where('id', id).first();

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await knex('usuarios').where('id', id).del();

    res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando el usuario.' });
  }
});

module.exports = router;
