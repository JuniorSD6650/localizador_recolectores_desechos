const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const { format } = require('date-fns');
const dateFormat = require('date-fns-tz');
const utcToZonedTime = dateFormat.utcToZonedTime;



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
      .select('id',
        knex.raw("CONCAT(nombre_recolector, ' - ', placa) as nombre_recolector"),
        'placa')
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

    const total = await applyFilters(knex('recolectores_desechos').count('* as total'), filters).first();
    const totalPages = Math.ceil(total.total / limit);

    const recolectoresRaw = await applyFilters(
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
                    'organizacion_id', z.organizacion_id,
                    'coordenadas_ruta', z.coordenadas_ruta,
                    'color_ruta', z.color_ruta
                  )
                )
                FROM asignaciones_zonas_recolectores azr
                LEFT JOIN zonas z ON azr.zona_id = z.id
                WHERE azr.recolector_id = r.id
              ),
              '[]'
            ) AS zonas_asignadas
          `)
        )
        .groupBy('r.id')
        .orderBy('r.id', 'desc')
        .limit(limit)
        .offset(offset),
      filters
    );

    // Convertimos el String JSON que devuelve la DB en un Array real de JS
    const recolectores = recolectoresRaw.map(recolector => {
      let zonas = typeof recolector.zonas_asignadas === 'string'
        ? JSON.parse(recolector.zonas_asignadas)
        : recolector.zonas_asignadas;

      if (Array.isArray(zonas)) {
        zonas = zonas.map(z => {
          let coords = z.coordenadas_ruta;
          if (typeof coords === 'string') {
            try { coords = JSON.parse(coords); } catch { coords = []; }
          }
          return {
            ...z,
            coordenadas_ruta: Array.isArray(coords) ? coords : []
          };
        });
      }

      return {
        ...recolector,
        zonas_asignadas: zonas || []
      };
    });

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

    if (recolector.fecha_ubicacion_actualizada) {
      try {
        const fecha = new Date(recolector.fecha_ubicacion_actualizada);
        if (!isNaN(fecha.getTime())) {
          recolector.fecha_ubicacion_actualizada = format(fecha, 'dd/MM/yyyy HH:mm:ss');
        }
      } catch (e) {
        // mantener el valor si falla el formateo
      }
    }

    const zonasAsignadas = await knex('asignaciones_zonas_recolectores as azr')
      .join('zonas as z', 'azr.zona_id', 'z.id')
      .where('azr.recolector_id', req.params.id)
      .select('z.id', 'z.nombre', 'z.descripcion', 'z.imagen', 'z.coordenadas_ruta', 'z.color_ruta');

    recolector.zonas_asignadas = (zonasAsignadas || []).map(z => {
      let coords = z.coordenadas_ruta;
      if (typeof coords === 'string') {
        try { coords = JSON.parse(coords); } catch { coords = []; }
      }
      return {
        ...z,
        coordenadas_ruta: Array.isArray(coords) ? coords : []
      };
    });

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

    // Validación mejorada
    if (ubicacion_enlace !== undefined) {
      if (ubicacion_enlace === null || ubicacion_enlace.trim() === "") {
        updates.ubicacion_enlace = null;
      } else {
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        const match = ubicacion_enlace.match(linkRegex);
        updates.ubicacion_enlace = match ? match[0] : null;
      }

      // Solo actualizamos la fecha si realmente se intentó tocar el enlace
      updates.fecha_ubicacion_actualizada = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    }

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await knex('recolectores_desechos')
      .where('id', req.params.id)
      .update(filteredUpdates);

    const updatedRecolector = await knex('recolectores_desechos')
      .where('id', req.params.id)
      .first();

    res.json({
      message: 'Recolector actualizado con éxito',
      recolector: updatedRecolector
    });
  } catch (err) {
    console.error(err); // Para que veas el error real en tu consola de Node
    res.status(500).json({
      error: 'Error actualizando el recolector',
      details: err.message
    });
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

// Obtener la ubicación actual (latitud y longitud) de un recolector por ID
router.get('/:id/ubicacion', async (req, res) => {
  try {
    const recolector = await knex('recolectores_desechos')
      .select('id', 'latitud', 'longitud', 'fecha_ubicacion_actualizada')
      .where('id', req.params.id)
      .first();

    if (!recolector) {
      return res.status(404).json({ error: 'Recolector no encontrado' });
    }

    // Formatear la fecha al formato esperado: DD/MM/AAAA HH:mm:ss
    let fechaFormateada = null;
    if (recolector.fecha_ubicacion_actualizada) {
      const fecha = new Date(recolector.fecha_ubicacion_actualizada);
      const dia = String(fecha.getDate()).padStart(2, '0');
      const mes = String(fecha.getMonth() + 1).padStart(2, '0');
      const anio = fecha.getFullYear();
      const horas = String(fecha.getHours()).padStart(2, '0');
      const minutos = String(fecha.getMinutes()).padStart(2, '0');
      const segundos = String(fecha.getSeconds()).padStart(2, '0');

      fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    }

    res.json({
      id: recolector.id,
      latitud: recolector.latitud,
      longitud: recolector.longitud,
      fecha_ubicacion_actualizada: fechaFormateada
    });
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo la ubicación', details: err.message || err });
  }
});

// Actualizar la ubicación de un recolector
router.put('/:id/ubicacion', async (req, res) => {
  const { latitud, longitud } = req.body;

  try {
    // Verificar que el recolector existe
    const recolector = await knex('recolectores_desechos')
      .where('id', req.params.id)
      .first();

    if (!recolector) {
      return res.status(404).json({ error: 'Recolector no encontrado' });
    }

    // Actualizar ubicación y fecha
    await knex('recolectores_desechos')
      .where('id', req.params.id)
      .update({
        latitud,
        longitud,
        fecha_ubicacion_actualizada: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      });

    res.json({
      message: 'Ubicación actualizada con éxito',
      ubicacion: { latitud, longitud }
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error actualizando la ubicación',
      details: err.message || err
    });
  }
});

module.exports = router;
