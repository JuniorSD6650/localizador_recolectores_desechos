// routes/organizacion.js

const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);

const fs = require('fs');
const multer = require('multer');
const ExcelJS = require('exceljs');
const upload = multer({ dest: 'uploads/' });

const ORGANIZACION_COLUMNS = [
  { header: 'Nombre', key: 'nombre', width: 30 },
  { header: 'Descripción', key: 'descripcion', width: 50 },
  { header: 'Link de Stream', key: 'streaming_link', width: 30 },
];

router.get('/list', async (req, res) => {
  try {
    const organizaciones = await knex('organizacion')
      .select('id', 'nombre')
      .orderBy('id', 'asc');

    res.status(200).json(organizaciones);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la lista de organizaciones',
      details: err.message || err,
    });
  }
});


router.get('/', async (req, res) => {
  try {
    const organizaciones = await knex('organizacion')
      .select('*')
      .orderBy('id', 'desc');

    res.json(organizaciones);
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo las organizaciones',
      details: err.message || err
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
  const { nombre, descripcion, streaming_link } = req.body;
  try {
    const result = await knex('organizacion').insert({
      nombre, descripcion, streaming_link
    });

    const newOrganizacion = await knex('organizacion').where('id', result[0]).first();

    res.status(201).json({ message: 'Organización creada con éxito', id: newOrganizacion.id });
  } catch (err) {
    res.status(500).json({ error: 'Error creando la organización', details: err.message || err });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, streaming_link } = req.body;
  try {
    const updatedOrganizacion = await knex('organizacion')
      .where('id', id)
      .update({ nombre, descripcion, streaming_link });

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
