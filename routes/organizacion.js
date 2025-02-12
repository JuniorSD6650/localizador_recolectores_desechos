// routes/organizacion.js

const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);

const applyFilters = (query, filters) => {
  const { nombre, descripcion } = filters;

  if (nombre) {
    query = query.where('nombre', 'like', `%${nombre}%`);
  }
  if (descripcion) {
    query = query.where('descripcion', 'like', `%${descripcion}%`);
  }

  return query;
};

router.get('/list', async (req, res) => {
  try {
    const organizaciones = await knex('organizacion')
      .select('id', 'nombre')
      .orderBy('id', 'desc');

    res.status(200).json(organizaciones);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la lista de organizaciones',
      details: err.message || err,
    });
  }
});

router.get('/', async (req, res) => {
  let { nombre, descripcion, page = 1, limit = 10 } = req.query;

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
    };

    let countQuery = knex('organizacion').count('* as total');
    countQuery = applyFilters(countQuery, filters);
    const totalCount = await countQuery.first();
    const total = parseInt(totalCount.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('organizacion')
      .select('*')
      .orderBy('id', 'desc');
    dataQuery = applyFilters(dataQuery, filters);
    dataQuery = dataQuery.limit(limit).offset(offset);

    const organizaciones = await dataQuery;

    res.json({
      organizaciones,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo las organizaciones',
      details: err.message || err,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const organizacion = await knex('organizacion').where('id', id).first();
    if (!organizacion) {
      return res.status(404).json({ error: 'Organización no encontrada' });
    }
    res.json(organizacion);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo la organización', details: err.message || err });
  }
});

router.post('/', async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const result = await knex('organizacion').insert({
      nombre, descripcion
    });

    const newOrganizacion = await knex('organizacion').where('id', result[0]).first();

    res.status(201).json({ message: 'Organización creada con éxito', id: newOrganizacion.id });
  } catch (err) {
    res.status(500).json({ error: 'Error creando la organización', details: err.message || err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const updatedOrganizacion = await knex('organizacion')
      .where('id', id)
      .update({ nombre, descripcion });

    if (updatedOrganizacion === 0) {
      return res.status(404).json({ error: 'Organización no encontrada' });
    }

    res.json({ message: 'Organización actualizada con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando la organización', details: err.message || err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrganizacion = await knex('organizacion').where('id', id).del();
    if (deletedOrganizacion === 0) {
      return res.status(404).json({ error: 'Organización no encontrada' });
    }
    res.json({ message: 'Organización eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando la organización', details: err.message || err });
  }
});

module.exports = router;
