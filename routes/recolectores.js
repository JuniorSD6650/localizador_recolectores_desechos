const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const { format, subHours, addHours } = require('date-fns');

// Función para aplicar filtros a las consultas
const applyFilters = (query, filters) => {
  const { nombre_recolector, placa, tipo_vehiculo, estado_operativo } = filters;

  if (nombre_recolector) {
    query = query.where('nombre_recolector', 'like', `%${nombre_recolector}%`);
  }
  if (placa) {
    query = query.where('placa', 'like', `%${placa}%`);
  }
  if (tipo_vehiculo) {
    query = query.where('tipo_vehiculo', 'like', `%${tipo_vehiculo}%`);
  }
  if (estado_operativo) {
    query = query.where('estado_operativo', estado_operativo);
  }

  return query;
};

// Obtener lista básica de recolectores
router.get('/list', async (req, res) => {
  try {
    const recolectores = await knex('recolectores_desechos')
      .select('id', 'nombre_recolector')
      .orderBy('id', 'desc');
    res.status(200).json(recolectores);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo la lista de recolectores', details: err.message || err });
  }
});
// Obtener recolectores con filtros, paginación y zonas asignadas
router.get('/', async (req, res) => {
  let { nombre_recolector, placa, tipo_vehiculo, estado_operativo, page = 1, limit = 10 } = req.query;

  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const offset = (page - 1) * limit;

  try {
    const filters = { nombre_recolector, placa, tipo_vehiculo, estado_operativo };

    // Obtener el total de recolectores filtrados
    const total = await applyFilters(knex('recolectores_desechos').count('* as total'), filters).first();
    const totalPages = Math.ceil(total.total / limit);

    // Consultar recolectores y realizar el JOIN para enlazar las zonas asignadas
    const recolectores = await applyFilters(
      knex('recolectores_desechos as r')
        .select(
          'r.id',
          'r.nombre_recolector',
          'r.ubicacion_enlace',
          'r.fecha_ubicacion_actualizada',
          'r.placa',
          'r.tipo_vehiculo',
          'r.estado_operativo',
          knex.raw(`
            COALESCE(
              (
                SELECT JSON_ARRAYAGG(
                  JSON_OBJECT(
                    'id', z.id,
                    'nombre', z.nombre,
                    'descripcion', z.descripcion,
                    'imagen', z.imagen,
                    'organizacion_id', z.organizacion_id
                  )
                )
                FROM asignaciones_zonas_recolectores azr
                LEFT JOIN zonas z ON azr.zona_id = z.id
                WHERE azr.recolector_id = r.id
              ),
              JSON_ARRAY()
            ) AS zonas_asignadas
          `)
        )
        .groupBy('r.id')
        .orderBy('r.id', 'desc')
        .limit(limit)
        .offset(offset),
      filters
    );

    res.json({
      recolectores,
      pagination: { total: total.total, totalPages, currentPage: page, limit }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo los recolectores', details: err.message || err });
  }
});

// Obtener recolector por ID
router.get('/:id', async (req, res) => {
  try {
    const recolector = await knex('recolectores_desechos').where('id', req.params.id).first();
    if (!recolector) return res.status(404).json({ error: 'Recolector no encontrado' });

    recolector.fecha_ubicacion_actualizada = recolector.fecha_ubicacion_actualizada
      ? format(subHours(new Date(recolector.fecha_ubicacion_actualizada), 5), 'dd/MM/yyyy HH:mm:ss')
      : null;

    res.json(recolector);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo el recolector', details: err.message || err });
  }
});

// Crear recolector
router.post('/', async (req, res) => {
  const { nombre_recolector, ubicacion_enlace, placa, tipo_vehiculo, estado_operativo } = req.body;

  try {
    const fechaActualizada = ubicacion_enlace ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null;

    const [id] = await knex('recolectores_desechos').insert({
      nombre_recolector,
      ubicacion_enlace,
      fecha_ubicacion_actualizada: fechaActualizada,
      placa,
      tipo_vehiculo,
      estado_operativo,
    });

    res.status(201).json({ message: 'Recolector creado con éxito', recolectorId: id });
  } catch (err) {
    res.status(500).json({ error: 'Error creando el recolector', details: err.message || err });
  }
});

// Actualizar recolector por ID
router.put('/:id', async (req, res) => {
  const { nombre_recolector, ubicacion_enlace, placa, tipo_vehiculo, estado_operativo } = req.body;

  try {
    const recolector = await knex('recolectores_desechos').where('id', req.params.id).first();
    if (!recolector) return res.status(404).json({ error: 'Recolector no encontrado' });

    const updates = {
      nombre_recolector,
      placa,
      tipo_vehiculo,
      estado_operativo,
    };

    if (ubicacion_enlace !== undefined) {
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      updates.ubicacion_enlace = ubicacion_enlace.match(linkRegex)?.[0] || null;
      updates.fecha_ubicacion_actualizada = updates.ubicacion_enlace
        ? format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        : recolector.fecha_ubicacion_actualizada;
    }

    const filteredUpdates = Object.fromEntries(Object.entries(updates).filter(([_, value]) => value !== undefined));

    await knex('recolectores_desechos').where('id', req.params.id).update(filteredUpdates);

    const updatedRecolector = await knex('recolectores_desechos').where('id', req.params.id).first();

    res.json({ message: 'Recolector actualizado con éxito', recolector: updatedRecolector });
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando el recolector', details: err.message || err });
  }
});

// Eliminar recolector
router.delete('/:id', async (req, res) => {
  try {
    const deletedRecolector = await knex('recolectores_desechos').where('id', req.params.id).del();
    if (!deletedRecolector) return res.status(404).json({ error: 'Recolector no encontrado' });

    res.json({ message: 'Recolector eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando el recolector', details: err.message || err });
  }
});

module.exports = router;
