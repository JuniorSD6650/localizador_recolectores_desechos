// routes/usuarios.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();
const { format } = require('date-fns');
const protect = require('../middleware/auth');

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
      .whereNot('usuarios.role', 'admin')
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

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await knex('usuarios')
      .select(
        'usuarios.username',
        'usuarios.role',
        'usuarios.recolector_id',
        'recolectores_desechos.nombre_recolector',
        'recolectores_desechos.ubicacion_enlace',
        'recolectores_desechos.fecha_ubicacion_actualizada',
        'recolectores_desechos.estado'
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
      estado: user.estado
    });
  } catch (error) {
    console.error("Error al obtener el perfil del usuario:", error);
    res.status(500).json({ message: 'Error interno al obtener el perfil del usuario.' });
  }
});

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

router.post('/', async (req, res) => {
  const { username, password, recolector_id } = req.body;

  try {
    if (recolector_id) {
      const recolector = await knex('recolectores_desechos').where('id', recolector_id).first();
      if (!recolector) {
        return res.status(400).json({ message: 'El recolector_id proporcionado no es válido.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUserId] = await knex('usuarios').insert({
      username,
      password: hashedPassword,
      role: 'localizador',
      recolector_id: recolector_id || null,
      created_at: knex.fn.now()
    });

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

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando el usuario.', details: error.message || error });
  }
});

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
