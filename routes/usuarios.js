const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();

const applyFilters = (query, filters) => {
  const { role, nombres, email, telefono, dni } = filters;

  if (role) query = query.where('role', 'like', `%${role}%`);
  if (nombres) query = query.whereRaw("CONCAT(nombres, ' ', primer_apellido, ' ', segundo_apellido) like ?", [`%${nombres}%`]);
  if (email) query = query.where('email', 'like', `%${email}%`);
  if (telefono) query = query.where('telefono', 'like', `%${telefono}%`);
  if (dni) query = query.where('dni', 'like', `%${dni}%`);

  return query;
};

router.get('/admin', async (req, res) => {
  try {
    const admin = await knex('usuarios').where('role', 'admin').first();
    if (!admin) {
      return res.status(404).json({ message: 'Administrador no encontrado.' });
    }

    const credenciales = await knex('credenciales').where('usuario_id', admin.id).first();

    res.status(200).json({ admin, credenciales });
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo el administrador.', details: err.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const zonas = await knex('usuarios')
      .select('id', 'nombres')
      .orderBy('id', 'desc');

    res.status(200).json(zonas);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la lista de usuarios',
      details: err.message || err,
    });
  }
});

router.get('/', async (req, res) => {
  const { role, nombres, email, telefono, dni, page = 1, limit = 10 } = req.query;

  const filters = {
    role,
    nombres,
    email,
    telefono,
    dni,
  };

  const offset = (page - 1) * limit;

  try {
    let countQuery = knex('usuarios').count('* as total').whereNot('role', 'admin');
    countQuery = applyFilters(countQuery, filters);
    const totalCountResult = await countQuery.first();
    const total = parseInt(totalCountResult.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('usuarios')
      .select(
        'usuarios.*',
        'asignaciones_vehiculos.id as asignacion_id',
        'recolectores_desechos.id as recolector_id',
        'recolectores_desechos.nombre_recolector',
        'recolectores_desechos.ubicacion_enlace',
        'recolectores_desechos.fecha_ubicacion_actualizada',
        'recolectores_desechos.placa',
        'recolectores_desechos.tipo_vehiculo',
        'recolectores_desechos.estado_operativo'
      )
      .leftJoin('asignaciones_vehiculos', 'usuarios.id', 'asignaciones_vehiculos.usuario_id')
      .leftJoin('recolectores_desechos', 'asignaciones_vehiculos.recolector_id', 'recolectores_desechos.id')
      .whereNot('usuarios.role', 'admin')
      .orderBy('id', 'desc');

    dataQuery = applyFilters(dataQuery, filters).limit(limit).offset(offset);

    const usuariosData = await dataQuery;

    const usuarios = usuariosData.reduce((acc, row) => {
      const usuario = acc.find(u => u.id === row.id);
      const recolector = {
        id: row.recolector_id,
        asignacion_id: row.asignacion_id,
        nombre_recolector: row.nombre_recolector,
        ubicacion_enlace: row.ubicacion_enlace,
        fecha_ubicacion_actualizada: row.fecha_ubicacion_actualizada,
        placa: row.placa,
        tipo_vehiculo: row.tipo_vehiculo,
        estado_operativo: row.estado_operativo,
      };

      if (usuario) {
        usuario.recolectores.push(recolector);
      } else {
        acc.push({
          id: row.id,
          role: row.role,
          nombres: row.nombres,
          primer_apellido: row.primer_apellido,
          segundo_apellido: row.segundo_apellido,
          dni: row.dni,
          email: row.email,
          telefono: row.telefono,
          created_at: row.created_at,
          recolectores: recolector.id ? [recolector] : [],
        });
      }

      return acc;
    }, []);

    res.status(200).json({
      usuarios,
      pagination: {
        total,
        totalPages,
        currentPage: parseInt(page, 10),
        limit: parseInt(limit, 10),
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo usuarios.', details: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioData = await knex('usuarios')
      .select(
        'usuarios.*',
        'asignaciones_vehiculos.id as asignacion_id',
        'recolectores_desechos.id as recolector_id',
        'recolectores_desechos.nombre_recolector',
        'recolectores_desechos.ubicacion_enlace',
        'recolectores_desechos.fecha_ubicacion_actualizada',
        'recolectores_desechos.placa',
        'recolectores_desechos.tipo_vehiculo',
        'recolectores_desechos.estado_operativo'
      )
      .leftJoin('asignaciones_vehiculos', 'usuarios.id', 'asignaciones_vehiculos.usuario_id')
      .leftJoin('recolectores_desechos', 'asignaciones_vehiculos.recolector_id', 'recolectores_desechos.id')
      .where('usuarios.id', id);

    if (usuarioData.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const usuario = {
      id: usuarioData[0].id,
      role: usuarioData[0].role,
      nombres: usuarioData[0].nombres,
      primer_apellido: usuarioData[0].primer_apellido,
      segundo_apellido: usuarioData[0].segundo_apellido,
      dni: usuarioData[0].dni,
      email: usuarioData[0].email,
      telefono: usuarioData[0].telefono,
      created_at: usuarioData[0].created_at,
      recolectores: usuarioData[0].recolector_id ? usuarioData.map(row => ({
        id: row.recolector_id,
        asignacion_id: row.asignacion_id,
        nombre_recolector: row.nombre_recolector,
        ubicacion_enlace: row.ubicacion_enlace,
        fecha_ubicacion_actualizada: row.fecha_ubicacion_actualizada,
        placa: row.placa,
        tipo_vehiculo: row.tipo_vehiculo,
        estado_operativo: row.estado_operativo,
      })) : [],
    };

    const credenciales = await knex('credenciales').where('usuario_id', id).first();

    res.status(200).json({ usuario, credenciales });
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo el usuario.', details: err.message });
  }
});

router.post('/', async (req, res) => {
  const { role, nombres, primer_apellido, segundo_apellido, dni, email, telefono, username, password } = req.body;

  try {
    const [userId] = await knex('usuarios').insert({
      role,
      nombres,
      primer_apellido,
      segundo_apellido,
      dni,
      email,
      telefono,
      created_at: knex.fn.now()
    });

    if (username && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await knex('credenciales').insert({
        username,
        password: hashedPassword,
        usuario_id: userId,
        created_at: knex.fn.now()
      });
    }

    res.status(201).json({ message: 'Usuario creado exitosamente', userId });
  } catch (err) {
    res.status(500).json({ error: 'Error creando el usuario.', details: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { role, nombres, primer_apellido, segundo_apellido, dni, email, telefono, username, password } = req.body;

  try {
    const user = await knex('usuarios').where('id', id).first();
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const updateData = {};
    if (role) updateData.role = role;
    if (nombres) updateData.nombres = nombres;
    if (primer_apellido) updateData.primer_apellido = primer_apellido;
    if (segundo_apellido) updateData.segundo_apellido = segundo_apellido;
    if (dni) updateData.dni = dni;
    if (email) updateData.email = email;
    if (telefono) updateData.telefono = telefono;

    if (Object.keys(updateData).length > 0) {
      await knex('usuarios').where('id', id).update(updateData);
    }

    if (username || password) {
      const credenciales = await knex('credenciales').where('usuario_id', id).first();
      const updates = {};

      if (username) updates.username = username;
      if (password) updates.password = await bcrypt.hash(password, 10);

      if (credenciales) {
        await knex('credenciales').where('usuario_id', id).update(updates);
      } else {
        updates.usuario_id = id;
        updates.created_at = knex.fn.now();
        await knex('credenciales').insert(updates);
      }
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando el usuario.', details: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await knex('usuarios').where('id', id).first();
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await knex('usuarios').where('id', id).del();
    res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando el usuario.', details: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const credenciales = await knex('credenciales').where('username', username).first();
    if (!credenciales) {
      return res.status(404).json({ message: 'Credenciales no encontradas.' });
    }

    const isMatch = await bcrypt.compare(password, credenciales.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta.' });
    }

    const usuario = await knex('usuarios').where('id', credenciales.usuario_id).first();
    const token = jwt.sign(
      { id: usuario.id, role: usuario.role },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '30d' }
    );

    res.status(200).json({ message: 'Login exitoso', token, role: usuario.role });
  } catch (err) {
    res.status(500).json({ error: 'Error en el login.', details: err.message });
  }
});

module.exports = router;
