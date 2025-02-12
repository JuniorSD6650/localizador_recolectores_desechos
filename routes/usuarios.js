const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex')(require('../knexfile'));
const router = express.Router();

const applyFilters = (query, filters) => {
  const { role, nombres, primer_apellido, email, telefono } = filters;

  if (role) query = query.where('role', 'like', `%${role}%`);
  if (nombres) query = query.where('nombres', 'like', `%${nombres}%`);
  if (primer_apellido) query = query.where('primer_apellido', 'like', `%${primer_apellido}%`);
  if (email) query = query.where('email', 'like', `%${email}%`);
  if (telefono) query = query.where('telefono', 'like', `%${telefono}%`);

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

router.get('/', async (req, res) => {
  const { role, nombres, primer_apellido, email, telefono, page = 1, limit = 10 } = req.query;

  const filters = {
    role,
    nombres,
    primer_apellido,
    email,
    telefono,
  };

  const offset = (page - 1) * limit;

  try {
    let countQuery = knex('usuarios').count('* as total').whereNot('role', 'admin');
    countQuery = applyFilters(countQuery, filters);
    const totalCountResult = await countQuery.first();
    const total = parseInt(totalCountResult.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('usuarios').select('*').whereNot('role', 'admin');
    dataQuery = applyFilters(dataQuery, filters).limit(limit).offset(offset);

    const usuarios = await dataQuery;

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
    const usuario = await knex('usuarios').where('id', id).first();
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const credenciales = await knex('credenciales').where('usuario_id', id).first();

    res.status(200).json({ usuario, credenciales });
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo el usuario.', details: err.message });
  }
});

router.post('/', async (req, res) => {
  const { role, nombres, primer_apellido, segundo_apellido, email, telefono, username, password } = req.body;

  try {
    const [userId] = await knex('usuarios').insert({
      role,
      nombres,
      primer_apellido,
      segundo_apellido,
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
  const { role, nombres, primer_apellido, segundo_apellido, email, telefono, username, password } = req.body;

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
