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

const uploadDir = 'uploads/reportes';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
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

router.post('/', upload.single('ruta_foto'), async (req, res) => {
  const { nombre_reportante, descripcion, numero_contacto, direccion } = req.body;

  try {
    const ruta_foto = req.file ? `uploads/reportes/${req.file.filename}` : null;

    const result = await knex('reportes').insert({
      nombre_reportante,
      descripcion,
      numero_contacto,
      direccion,
      ruta_foto,
      estado_reporte: 'pendiente',
      created_at: knex.fn.now()
    });

    const newReporteId = result[0];
    res.status(201).json({
      message: 'Reporte creado con éxito',
      id: newReporteId,
      ruta_foto: ruta_foto
    });
  } catch (err) {
    if (req.file) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file after failed insert:', unlinkError);
      }
    }
    res.status(500).json({ error: 'Error creando el reporte', details: err.message || err });
  }
});

router.put('/:id', upload.single('ruta_foto'), async (req, res) => {
  const { id } = req.params;
  const { nombre_reportante, descripcion, numero_contacto, estado_reporte, direccion } = req.body;

  try {
    const updateData = {
      ...(nombre_reportante && { nombre_reportante }),
      ...(descripcion && { descripcion }),
      ...(numero_contacto && { numero_contacto }),
      ...(estado_reporte && { estado_reporte }),
      ...(direccion && { direccion }),
      created_at: knex.fn.now()
    };

    if (req.file) {
      const oldReporte = await knex('reportes').where('id', id).first();
      if (oldReporte && oldReporte.ruta_foto) {
        try {
          if (fs.existsSync(oldReporte.ruta_foto)) {
            await fs.promises.unlink(oldReporte.ruta_foto);
          }
        } catch (unlinkError) {
          console.error('Error deleting old file:', unlinkError);
        }
      }

      updateData.ruta_foto = `uploads/reportes/${req.file.filename}`;
    }

    const updatedReporte = await knex('reportes')
      .where('id', id)
      .update(updateData);

    if (updatedReporte === 0) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    res.json({ message: 'Reporte actualizado con éxito' });
  } catch (err) {
    if (req.file) {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file after failed update:', unlinkError);
      }
    }
    res.status(500).json({ error: 'Error actualizando el reporte', details: err.message || err });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reporte = await knex('reportes').where('id', id).first();

    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }

    if (reporte.ruta_foto) {
      try {
        if (fs.existsSync(reporte.ruta_foto)) {
          await fs.promises.unlink(reporte.ruta_foto);
        }
      } catch (unlinkError) {
        console.error('Error al eliminar el archivo:', unlinkError);
      }
    }

    const deletedReporte = await knex('reportes').where('id', id).del();
    res.json({ message: 'Reporte eliminado con éxito' });
  } catch (err) {
    res.status(500).json({
      error: 'Error eliminando el reporte',
      details: err.message || err,
    });
  }
});

module.exports = router;
