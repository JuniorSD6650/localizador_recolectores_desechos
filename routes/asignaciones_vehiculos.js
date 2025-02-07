const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);

const applyFilters = (query, filters) => {
  const { usuario_id, recolector_id, fecha_inicio, fecha_fin } = filters;

  if (usuario_id) {
    query = query.where('asignaciones_vehiculos.usuario_id', usuario_id);
  }
  if (recolector_id) {
    query = query.where('asignaciones_vehiculos.recolector_id', recolector_id);
  }
  if (fecha_inicio) {
    query = query.where('asignaciones_vehiculos.created_at', '>=', fecha_inicio);
  }
  if (fecha_fin) {
    query = query.where('asignaciones_vehiculos.created_at', '<=', fecha_fin);
  }

  return query;
};

router.get('/', async (req, res) => {
  let { usuario_id, recolector_id, fecha_inicio, fecha_fin, page = 1, limit = 10 } = req.query;

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
      recolector_id,
      fecha_inicio,
      fecha_fin,
    };

    let countQuery = knex('asignaciones_vehiculos').count('* as total');
    countQuery = applyFilters(countQuery, filters);
    const totalCount = await countQuery.first();
    const total = parseInt(totalCount.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('asignaciones_vehiculos')
      .select(
        'asignaciones_vehiculos.id',
        'asignaciones_vehiculos.created_at',
        'usuarios.id as usuario_id',
        'usuarios.username',
        'usuarios.nombre_completo',
        'usuarios.email',
        'usuarios.telefono',
        'recolectores_desechos.id as recolector_id',
        'recolectores_desechos.nombre_recolector',
        'recolectores_desechos.placa',
        'recolectores_desechos.tipo_vehiculo',
        'recolectores_desechos.estado_operativo'
      )
      .leftJoin('usuarios', 'asignaciones_vehiculos.usuario_id', 'usuarios.id')
      .leftJoin('recolectores_desechos', 'asignaciones_vehiculos.recolector_id', 'recolectores_desechos.id')
      .orderBy('asignaciones_vehiculos.id', 'desc');

    dataQuery = applyFilters(dataQuery, filters);
    dataQuery = dataQuery.limit(limit).offset(offset);

    const asignaciones = await dataQuery;

    res.json({
      asignaciones,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo las asignaciones de vehículos',
      details: err.message || err,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const asignacion = await knex('asignaciones_vehiculos')
      .select(
        'asignaciones_vehiculos.id',
        'asignaciones_vehiculos.created_at',
        'usuarios.id as usuario_id',
        'usuarios.username',
        'usuarios.nombre_completo',
        'usuarios.email',
        'usuarios.telefono',
        'recolectores_desechos.id as recolector_id',
        'recolectores_desechos.nombre_recolector',
        'recolectores_desechos.placa',
        'recolectores_desechos.tipo_vehiculo',
        'recolectores_desechos.estado_operativo'
      )
      .leftJoin('usuarios', 'asignaciones_vehiculos.usuario_id', 'usuarios.id')
      .leftJoin('recolectores_desechos', 'asignaciones_vehiculos.recolector_id', 'recolectores_desechos.id')
      .where('asignaciones_vehiculos.id', id)
      .first();

    if (!asignacion) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }
    res.json(asignacion);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo la asignación', details: err.message || err });
  }
});

router.post('/', async (req, res) => {
  const { usuario_id, recolector_id } = req.body;

  try {
    // Verificar si ya existe la asignación
    const existingAsignacion = await knex('asignaciones_vehiculos')
      .where({ usuario_id, recolector_id })
      .first();

    if (existingAsignacion) {
      return res.status(400).json({
        error: 'Ya existe una asignación de este recolector al usuario.',
      });
    }

    // Crear la asignación
    const result = await knex('asignaciones_vehiculos').insert({
      usuario_id,
      recolector_id,
    });

    const newAsignacion = await knex('asignaciones_vehiculos')
      .where('id', result[0])
      .first();

    res.status(201).json({ message: 'Asignación creada con éxito', id: newAsignacion.id });
  } catch (err) {
    res.status(500).json({ error: 'Error creando la asignación', details: err.message || err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { usuario_id, recolector_id } = req.body;

  try {
    if (usuario_id && recolector_id) {
      const existingAsignacion = await knex('asignaciones_vehiculos')
        .where({ usuario_id, recolector_id })
        .andWhereNot('id', id)
        .first();

      if (existingAsignacion) {
        return res.status(400).json({
          error: 'Ya existe una asignación de este recolector al usuario.',
        });
      }
    }

    const updatedAsignacion = await knex('asignaciones_vehiculos')
      .where('id', id)
      .update({
        ...(usuario_id && { usuario_id }),
        ...(recolector_id && { recolector_id }),
      });

    if (updatedAsignacion === 0) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }

    res.json({ message: 'Asignación actualizada con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando la asignación', details: err.message || err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAsignacion = await knex('asignaciones_vehiculos').where('id', id).del();
    if (deletedAsignacion === 0) {
      return res.status(404).json({ error: 'Asignación no encontrada' });
    }
    res.json({ message: 'Asignación eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando la asignación', details: err.message || err });
  }
});

module.exports = router;
