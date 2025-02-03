// routes/reportes.js

const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const applyFilters = (query, filters) => {
  const { nombre_reportante, descripcion, numero_contacto, estado_reporte, direccion } = filters;

  if (nombre_reportante) {
    query = query.where('nombre_reportante', 'like', `%${nombre_reportante}%`);
  }
  if (descripcion) {
    query = query.where('descripcion', 'like', `%${descripcion}%`);
  }
  if (numero_contacto) {
    query = query.where('numero_contacto', 'like', `%${numero_contacto}%`);
  }
  if (estado_reporte) {
    query = query.where('estado_reporte', estado_reporte);
  }
  if (direccion) {
    query = query.where('direccion', 'like', `%${direccion}%`);
  }

  return query;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/reportes');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  let { nombre_reportante, descripcion, numero_contacto, estado_reporte, direccion, page = 1, limit = 10 } = req.query;

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
      nombre_reportante,
      descripcion,
      numero_contacto,
      estado_reporte,
      direccion,
    };

    let countQuery = knex('reportes').count('* as total');
    countQuery = applyFilters(countQuery, filters);
    const totalCount = await countQuery.first();
    const total = parseInt(totalCount.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('reportes').select('*');
    dataQuery = applyFilters(dataQuery, filters);
    dataQuery = dataQuery.orderBy('id', 'desc').limit(limit).offset(offset);

    const reportes = await dataQuery;

    res.json({
      reportes,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo los reportes',
      details: err.message || err,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reporte = await knex('reportes')
      .select('reportes.*')
      .where('reportes.id', id)
      .first();

    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    res.json(reporte);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo el reporte', details: err.message || err });
  }
});

router.post('/', upload.single('foto'), async (req, res) => {
  const { nombre_reportante, descripcion, numero_contacto, estado } = req.body;
  const ruta_foto = req.file ? `uploads/reportes/${req.file.filename}` : null;

  try {
    const result = await knex('reportes').insert({
      nombre_reportante,
      descripcion,
      numero_contacto,
      ruta_foto,
      estado: estado || 'pendiente',
    });

    const newReporteId = result[0];
    res.status(201).json({ message: 'Reporte creado con éxito', id: newReporteId });
  } catch (err) {
    res.status(500).json({ error: 'Error creando el reporte', details: err.message || err });
  }
});

router.put('/:id', upload.single('foto'), async (req, res) => {
  const { id } = req.params;
  const { nombre_reportante, descripcion, numero_contacto, estado } = req.body;
  const ruta_foto = req.file ? `uploads/reportes/${req.file.filename}` : null;

  try {
    const reporte = await knex('reportes').where('id', id).first();
    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    if (ruta_foto && reporte.ruta_foto) {
      const oldFilePath = path.join(__dirname, '..', 'public', reporte.ruta_foto);
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (err) {
          console.warn('Error eliminando archivo anterior:', err.message);
        }
      }
    }

    const updateFields = {
      ...(nombre_reportante && { nombre_reportante }),
      ...(descripcion && { descripcion }),
      ...(numero_contacto && { numero_contacto }),
      ...(ruta_foto && { ruta_foto }),
      ...(estado && { estado }),
    };

    const updatedReporte = await knex('reportes').where('id', id).update(updateFields);

    if (updatedReporte === 0) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    res.json({ message: 'Reporte actualizado con éxito' });
  } catch (err) {
    res.status(500).json({
      error: 'Error actualizando el reporte',
      details: err.message || err,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reporte = await knex('reportes').where('id', id).first();
    const ruta_foto = reporte ? reporte.ruta_foto : null;

    if (ruta_foto) {
      const filePath = path.join(__dirname, '..', 'public', ruta_foto);

      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        return res.status(500).json({ error: 'Error eliminando el archivo', details: err.message || err });
      }
    }

    const deletedReporte = await knex('reportes').where('id', id).del();

    if (deletedReporte === 0) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    res.json({ message: 'Reporte eliminado con éxito' });
  } catch (err) {
    res.status(500).json({
      error: 'Error eliminando el reporte',
      details: err.message || err,
    });
  }
});

module.exports = router;
