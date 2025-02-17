const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);

const applyFilters = (query, filters) => {
  const { nombre, descripcion, zona_id, numero_cuadra } = filters;

  if (nombre) {
    query = query.where('nombre', 'like', `%${nombre}%`);
  }
  if (descripcion) {
    query = query.where('descripcion', 'like', `%${descripcion}%`);
  }
  if (zona_id) {
    query = query.where('zona_id', zona_id);
  }
  if (numero_cuadra) {
    query = query.where('numero_cuadra', numero_cuadra);
  }

  return query;
};

router.get('/list', async (req, res) => {
  try {
    const recolectores = await knex('calles')
      .select('id', 'nombre')
      .orderBy('id', 'desc');

    res.status(200).json(recolectores);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la lista de calles',
      details: err.message || err,
    });
  }
});

router.get('/', async (req, res) => {
  let { nombre, descripcion, zona_id, numero_cuadra, page = 1, limit = 10 } = req.query;

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
      nombre,
      descripcion,
      zona_id,
      numero_cuadra,
    };

    let countQuery = knex('calles').count('* as total');
    countQuery = applyFilters(countQuery, filters);
    const totalCount = await countQuery.first();
    const total = parseInt(totalCount.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('calles')
      .select('calles.*', 'zonas.nombre as zona_nombre')
      .join('zonas', 'calles.zona_id', 'zonas.id')
      .orderBy('calles.id', 'desc');
    dataQuery = applyFilters(dataQuery, filters);
    dataQuery = dataQuery.limit(limit).offset(offset);

    const calles = await dataQuery;

    res.json({
      calles,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo las calles',
      details: err.message || err,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const calle = await knex('calles').where('id', id).first();
    if (!calle) {
      return res.status(404).json({ error: 'Calle no encontrada' });
    }
    res.json(calle);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la calle',
      details: err.message || err,
    });
  }
});

router.post('/', async (req, res) => {
  const { nombre, descripcion, hora_inicio, hora_final, numero_cuadra, zona_id } = req.body;

  try {
    const result = await knex('calles').insert({
      nombre,
      descripcion,
      hora_inicio,
      hora_final,
      numero_cuadra,
      zona_id,
    });

    const newCalle = await knex('calles').where('id', result[0]).first();
    res.status(201).json({ message: 'Calle creada con éxito', id: newCalle.id });
  } catch (err) {
    res.status(500).json({
      error: 'Error creando la calle',
      details: err.message || err,
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, hora_inicio, hora_final, numero_cuadra, zona_id } = req.body;

  try {
    const calle = await knex('calles').where('id', id).first();
    if (!calle) {
      return res.status(404).json({ error: 'Calle no encontrada' });
    }

    const updateFields = {
      ...(nombre && { nombre }),
      ...(descripcion && { descripcion }),
      ...(hora_inicio && { hora_inicio }),
      ...(hora_final && { hora_final }),
      ...(numero_cuadra && { numero_cuadra }),
      ...(zona_id && { zona_id }),
    };

    const updatedCalle = await knex('calles').where('id', id).update(updateFields);
    if (updatedCalle === 0) {
      return res.status(404).json({ error: 'Calle no encontrada' });
    }

    res.json({ message: 'Calle actualizada con éxito' });
  } catch (err) {
    res.status(500).json({
      error: 'Error actualizando la calle',
      details: err.message || err,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const calle = await knex('calles').where('id', id).first();
    if (!calle) {
      return res.status(404).json({ error: 'Calle no encontrada' });
    }

    const deletedCalle = await knex('calles').where('id', id).del();
    if (deletedCalle === 0) {
      return res.status(404).json({ error: 'Calle no encontrada' });
    }

    res.json({ message: 'Calle eliminada con éxito' });
  } catch (err) {
    res.status(500).json({
      error: 'Error eliminando la calle',
      details: err.message || err,
    });
  }
});

module.exports = router;
