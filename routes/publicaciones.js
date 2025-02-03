const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);

const applyFilters = (query, filters) => {
  const { titulo, descripcion, activo } = filters;

  if (titulo) {
    query = query.where('titulo', 'like', `%${titulo}%`);
  }
  if (descripcion) {
    query = query.where('descripcion', 'like', `%${descripcion}%`);
  }
  if (activo !== undefined) {
    query = query.where('activo', activo);
  }

  return query;
};

router.get('/list', async (req, res) => {
  try {
    const publicaciones = await knex('publicaciones')
      .select('id', 'titulo')
      .orderBy('id', 'desc');

    res.status(200).json(publicaciones);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la lista de publicaciones',
      details: err.message || err,
    });
  }
});

router.get('/', async (req, res) => {
  let { titulo, descripcion, activo, page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  if (isNaN(page) || page < 1) {
    return res.status(400).json({ error: 'El parámetro "page" debe ser un número mayor o igual a 1.' });
  }


  limit = parseInt(limit, 10);
  if (isNaN(limit) || limit < 1) {
    limit = 10;
  }

  const offset = (page - 1) * limit;

  if (activo !== undefined) {
    activo = activo === 'true';
  }

  try {
    const filters = {
      titulo,
      descripcion,
      activo,
    };

    let countQuery = knex('publicaciones').count('* as total');
    countQuery = applyFilters(countQuery, filters);
    const totalCount = await countQuery.first();
    const total = parseInt(totalCount.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('publicaciones')
      .select('*')
      .orderBy('id', 'desc');
    dataQuery = applyFilters(dataQuery, filters);
    dataQuery = dataQuery.limit(limit).offset(offset);

    const publicaciones = await dataQuery;

    res.json({
      publicaciones,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo las publicaciones',
      details: err.message || err,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const publicacion = await knex('publicaciones').where('id', id).first();
    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json(publicacion);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo la publicación', details: err.message || err });
  }
});

router.post('/', async (req, res) => {
  const { titulo, imagen_url, descripcion, activo } = req.body;
  try {
    const result = await knex('publicaciones').insert({
      titulo,
      imagen_url,
      descripcion,
      activo: activo !== undefined ? activo : true,
    });

    const newPublicacion = await knex('publicaciones').where('id', result[0]).first();

    res.status(201).json({ message: 'Publicación creada con éxito', id: newPublicacion.id });
  } catch (err) {
    res.status(500).json({ error: 'Error creando la publicación', details: err.message || err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, imagen_url, descripcion, activo } = req.body;
  try {
    const updatedPublicacion = await knex('publicaciones')
      .where('id', id)
      .update({
        ...(titulo && { titulo }),
        ...(imagen_url && { imagen_url }),
        ...(descripcion && { descripcion }),
        ...(activo !== undefined && { activo }),
      });

    if (updatedPublicacion === 0) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    res.json({ message: 'Publicación actualizada con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando la publicación', details: err.message || err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPublicacion = await knex('publicaciones').where('id', id).del();
    if (deletedPublicacion === 0) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json({ message: 'Publicación eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando la publicación', details: err.message || err });
  }
});

module.exports = router;
