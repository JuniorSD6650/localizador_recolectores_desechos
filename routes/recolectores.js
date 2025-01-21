// routes/recolectores.js

const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const { format, addHours, subHours } = require('date-fns');

router.get('/list', async (req, res) => {
  try {
    const recolectores = await knex('recolectores_desechos')
      .select('id', 'nombre_recolector')
      .orderBy('id', 'asc');

    res.status(200).json(recolectores);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la lista de recolectores',
      details: err.message || err,
    });
  }
});

router.get('/', async (req, res) => {
  let { fecha } = req.query;

  try {
    let query;

    if (fecha) {
      const parsedDate = parse(fecha, 'dd/MM/yyyy', new Date());
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');

      query = knex('recolectores_desechos')
        .select('recolectores_desechos.*')
        .leftJoin('eventos', 'recolectores_desechos.id', 'eventos.recolector_id')
        .where('eventos.fecha', formattedDate)
        .groupBy('recolectores_desechos.id')
        .orderBy('recolectores_desechos.id', 'desc');
    } else {
      query = knex('recolectores_desechos')
        .select('*')
        .orderBy('id', 'desc');
    }

    const recolectores = await query;

    const formattedRecolectores = recolectores.map(recolector => ({
      ...recolector,
      fecha_ubicacion_actualizada: recolector.fecha_ubicacion_actualizada
        ? format(new Date(recolector.fecha_ubicacion_actualizada), 'dd/MM/yyyy HH:mm:ss')
        : null,
    }));

    res.json(formattedRecolectores);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo los recolectores',
      details: err.message || err
    });
  }
});

// Obtener recolector por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recolector = await knex('recolectores_desechos').where('id', id).first();
    if (!recolector) {
      return res.status(404).json({ error: 'Recolector no encontrado' });
    }

    const formattedRecolector = {
      ...recolector,
      fecha_ubicacion_actualizada: recolector.fecha_ubicacion_actualizada
        ? format(subHours(new Date(recolector.fecha_ubicacion_actualizada), 5), 'dd/MM/yyyy HH:mm:ss')
        : null,
    };

    res.json(formattedRecolector);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo el recolector', details: err.message || err });
  }
});

// Crear un nuevo recolector
router.post('/', async (req, res) => {
  const {
    nombre_recolector,
    telefono_recolector,
    zona_responsable,
    ubicacion_enlace,
    estado,
    organizacion_id
  } = req.body;

  try {
    const now = new Date();
    const peruTime = subHours(now, 0);
    const fechaActualizada = ubicacion_enlace
      ? format(peruTime, 'yyyy-MM-dd HH:mm:ss')
      : null;

    const result = await knex('recolectores_desechos').insert({
      nombre_recolector,
      telefono_recolector,
      zona_responsable,
      ubicacion_enlace,
      fecha_ubicacion_actualizada: fechaActualizada,
      estado,
      organizacion_id
    });

    res.status(201).json({ message: 'Recolector creado con éxito', recolector: result });
  } catch (err) {
    res.status(500).json({ error: 'Error creando el recolector', details: err.message || err });
  }
});

// Actualizar recolector por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    nombre_recolector,
    telefono_recolector,
    zona_responsable,
    ubicacion_enlace,
    estado,
    organizacion_id
  } = req.body;

  try {
    const recolector = await knex('recolectores_desechos').where('id', id).first();

    if (!recolector) {
      return res.status(404).json({ error: 'Recolector no encontrado' });
    }

    const updates = {
      nombre_recolector,
      telefono_recolector,
      zona_responsable,
      estado,
      organizacion_id,
    };

    if (ubicacion_enlace !== undefined) {
      const linkRegex = /(https?:\/\/[^\s]+)/g;
      const enlaceExtraido = ubicacion_enlace.match(linkRegex)?.[0] || null;
      updates.ubicacion_enlace = enlaceExtraido;
      updates.fecha_ubicacion_actualizada = enlaceExtraido
        ? format(addHours(new Date(), 0), 'yyyy-MM-dd HH:mm:ss')
        : recolector.fecha_ubicacion_actualizada;
    }

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    const updatedRecolector = await knex('recolectores_desechos')
      .where('id', id)
      .update(filteredUpdates);

    if (updatedRecolector === 0) {
      return res.status(404).json({ error: 'Recolector no encontrado al intentar actualizar' });
    }

    const updatedRecolectorData = await knex('recolectores_desechos').where('id', id).first();

    res.json({
      message: 'Recolector actualizado con éxito',
      recolector: updatedRecolectorData,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error actualizando el recolector',
      details: err.message || err,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecolector = await knex('recolectores_desechos').where('id', id).del();
    if (deletedRecolector === 0) {
      return res.status(404).json({ error: 'Recolector no encontrado' });
    }
    res.json({ message: 'Recolector eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando el recolector', details: err.message || err });
  }
});

module.exports = router;
