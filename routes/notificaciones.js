const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);

const applyFilters = (query, filters) => {
  const { titulo, mensaje, prioridad } = filters;

  if (titulo) {
    query = query.where('titulo', 'like', `%${titulo}%`);
  }
  if (mensaje) {
    query = query.where('mensaje', 'like', `%${mensaje}%`);
  }
  if (prioridad) {
    query = query.where('prioridad', prioridad);
  }

  return query;
};

router.get('/list', async (req, res) => {
  try {
    const notificaciones = await knex('notificaciones')
      .select('id', 'titulo')
      .orderBy('id', 'desc');

    res.status(200).json(notificaciones);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la lista de notificaciones',
      details: err.message || err,
    });
  }
});

router.get('/', async (req, res) => {
  let { titulo, mensaje, prioridad, page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  if (isNaN(page) || page < 1) {
    return res.status(400).json({ error: 'El parámetro "page" debe ser un número mayor o igual a 1.' });
  }

  limit = parseInt(limit, 10);
  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }


  const offset = (page - 1) * limit;

  try {
    const filters = {
      titulo,
      mensaje,
      prioridad,
    };

    let countQuery = knex('notificaciones').count('* as total');
    countQuery = applyFilters(countQuery, filters);
    const totalCount = await countQuery.first();
    const total = parseInt(totalCount.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('notificaciones')
      .select('*')
      .orderBy('id', 'desc');
    dataQuery = applyFilters(dataQuery, filters);
    dataQuery = dataQuery.limit(limit).offset(offset);

    const notificaciones = await dataQuery;

    res.json({
      notificaciones,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo las notificaciones',
      details: err.message || err,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const notificacion = await knex('notificaciones').where('id', id).first();
    if (!notificacion) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }
    res.json(notificacion);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo la notificación', details: err.message || err });
  }
});

router.post('/', async (req, res) => {
  const { titulo, mensaje, prioridad } = req.body;
  try {
    const result = await knex('notificaciones').insert({
      titulo,
      mensaje,
      prioridad: prioridad || 'baja',
    });

    const newNotificacion = await knex('notificaciones').where('id', result[0]).first();

    res.status(201).json({ message: 'Notificación creada con éxito', id: newNotificacion.id });
  } catch (err) {
    res.status(500).json({ error: 'Error creando la notificación', details: err.message || err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, mensaje, prioridad } = req.body;
  try {
    const updatedNotificacion = await knex('notificaciones')
      .where('id', id)
      .update({
        ...(titulo && { titulo }),
        ...(mensaje && { mensaje }),
        ...(prioridad && { prioridad }),
      });

    if (updatedNotificacion === 0) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    res.json({ message: 'Notificación actualizada con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando la notificación', details: err.message || err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNotificacion = await knex('notificaciones').where('id', id).del();
    if (deletedNotificacion === 0) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }
    res.json({ message: 'Notificación eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando la notificación', details: err.message || err });
  }
});

module.exports = router;
