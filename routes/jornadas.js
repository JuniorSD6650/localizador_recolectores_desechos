const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const { format } = require('date-fns');

const applyFilters = (query, filters) => {
  const { usuario_id, fecha_inicio, fecha_fin, observaciones } = filters;

  if (usuario_id) {
    query = query.where('usuario_id', usuario_id);
  }
  if (fecha_inicio) {
    query = query.where('fecha_inicio', '>=', fecha_inicio);
  }
  if (fecha_fin) {
    query = query.where('fecha_fin', '<=', fecha_fin);
  }
  if (observaciones) {
    query = query.where('observaciones', 'like', `%${observaciones}%`);
  }

  return query;
};

router.get('/', async (req, res) => {
  let { usuario_id, fecha_inicio, fecha_fin, observaciones, page = 1, limit = 10 } = req.query;

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
      usuario_id,
      fecha_inicio,
      fecha_fin,
      observaciones,
    };

    let countQuery = knex('historial_jornadas').count('* as total');
    countQuery = applyFilters(countQuery, filters);
    const totalCount = await countQuery.first();
    const total = parseInt(totalCount.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('historial_jornadas')
      .select('*')
      .orderBy('id', 'desc');
    dataQuery = applyFilters(dataQuery, filters);
    dataQuery = dataQuery.limit(limit).offset(offset);

    const jornadas = await dataQuery;

    const jornadasFormateadas = jornadas.map(jornada => ({
      ...jornada,
      fecha_inicio: jornada.fecha_inicio ? format(new Date(jornada.fecha_inicio), 'dd/MM/yyyy HH:mm:ss') : null,
      fecha_fin: jornada.fecha_fin ? format(new Date(jornada.fecha_fin), 'dd/MM/yyyy HH:mm:ss') : null
    }));

    res.json({
      jornadas: jornadasFormateadas,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo el historial de jornadas',
      details: err.message || err,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const jornada = await knex('historial_jornadas').where('id', id).first();
    if (!jornada) {
      return res.status(404).json({ error: 'Jornada no encontrada' });
    }

    if (jornada.fecha_inicio) {
      jornada.fecha_inicio = format(new Date(jornada.fecha_inicio), 'dd/MM/yyyy HH:mm:ss');
    }
    if (jornada.fecha_fin) {
      jornada.fecha_fin = format(new Date(jornada.fecha_fin), 'dd/MM/yyyy HH:mm:ss');
    }

    res.json(jornada);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo la jornada', details: err.message || err });
  }
});

router.post('/', async (req, res) => {
  const { usuario_id, fecha_inicio, fecha_fin, observaciones } = req.body;
  try {
    const fechaInicioFormateada = fecha_inicio ? format(new Date(fecha_inicio), 'yyyy-MM-dd HH:mm:ss') : null;
    const fechaFinFormateada = fecha_fin ? format(new Date(fecha_fin), 'yyyy-MM-dd HH:mm:ss') : null;

    const result = await knex('historial_jornadas').insert({
      usuario_id,
      fecha_inicio: fechaInicioFormateada || knex.fn.now(),
      fecha_fin: fechaFinFormateada,
      observaciones,
    });

    const newJornada = await knex('historial_jornadas').where('id', result[0]).first();

    res.status(201).json({ message: 'Jornada creada con éxito', id: newJornada.id });
  } catch (err) {
    res.status(500).json({ error: 'Error creando la jornada', details: err.message || err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha_inicio, fecha_fin, observaciones } = req.body;
  try {
    const fechaInicioFormateada = fecha_inicio ? format(new Date(fecha_inicio), 'yyyy-MM-dd HH:mm:ss') : undefined;
    const fechaFinFormateada = fecha_fin ? format(new Date(fecha_fin), 'yyyy-MM-dd HH:mm:ss') : undefined;

    const updatedJornada = await knex('historial_jornadas')
      .where('id', id)
      .update({
        ...(fechaInicioFormateada && { fecha_inicio: fechaInicioFormateada }),
        ...(fechaFinFormateada && { fecha_fin: fechaFinFormateada }),
        ...(observaciones && { observaciones }),
      });

    if (updatedJornada === 0) {
      return res.status(404).json({ error: 'Jornada no encontrada' });
    }

    res.json({ message: 'Jornada actualizada con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando la jornada', details: err.message || err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedJornada = await knex('historial_jornadas').where('id', id).del();
    if (deletedJornada === 0) {
      return res.status(404).json({ error: 'Jornada no encontrada' });
    }
    res.json({ message: 'Jornada eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando la jornada', details: err.message || err });
  }
});

module.exports = router;
