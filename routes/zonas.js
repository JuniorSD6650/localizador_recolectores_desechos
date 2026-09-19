// routes/zonas.js

const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const applyFilters = (query, filters) => {
  const { nombre, descripcion, organizacion_id } = filters;

  if (nombre) {
    query = query.where('nombre', 'like', `%${nombre}%`);
  }
  if (descripcion) {
    query = query.where('descripcion', 'like', `%${descripcion}%`);
  }
  if (organizacion_id) {
    query = query.where('organizacion_id', organizacion_id);
  }

  return query;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'zonas');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const parseZonaRuta = (zona) => {
  if (!zona) return zona;
  let coordenadas = zona.coordenadas_ruta;
  if (typeof coordenadas === 'string') {
    try {
      coordenadas = JSON.parse(coordenadas);
    } catch {
      coordenadas = [];
    }
  }
  return {
    ...zona,
    coordenadas_ruta: Array.isArray(coordenadas) ? coordenadas : []
  };
};

router.get('/list', async (req, res) => {
  try {
    const zonas = await knex('zonas')
      .select('id', 'nombre', 'coordenadas_ruta', 'color_ruta')
      .orderBy('id', 'desc');

    res.status(200).json(zonas.map(parseZonaRuta));
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la lista de zonas',
      details: err.message || err,
    });
  }
});

router.get('/', async (req, res) => {
  let { nombre, descripcion, organizacion_id, page = 1, limit = 10 } = req.query;

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
      organizacion_id,
    };

    let countQuery = knex('zonas').count('* as total');
    countQuery = applyFilters(countQuery, filters);
    const totalCount = await countQuery.first();
    const total = parseInt(totalCount.total, 10);
    const totalPages = total > 0 ? Math.ceil(total / limit) : 1;

    let dataQuery = knex('zonas')
      .select('*')
      .orderBy('id', 'desc');
    dataQuery = applyFilters(dataQuery, filters);
    dataQuery = dataQuery.limit(limit).offset(offset);

    const zonasRaw = await dataQuery;
    const zonas = zonasRaw.map(parseZonaRuta);

    res.json({
      zonas,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo las zonas',
      details: err.message || err,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const zona = await knex('zonas').where('id', id).first();
    if (!zona) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    res.json(parseZonaRuta(zona));
  } catch (err) {
    res.status(500).json({
      error: 'Error obteniendo la zona',
      details: err.message || err,
    });
  }
});

router.post('/', upload.single('imagen'), async (req, res) => {
  const { nombre, descripcion, organizacion_id, coordenadas_ruta, color_ruta } = req.body;
  const ruta_imagen = req.file ? `uploads/zonas/${req.file.filename}` : null;

  let parsedCoordenadas = null;
  if (coordenadas_ruta) {
    try {
      parsedCoordenadas = typeof coordenadas_ruta === 'string'
        ? JSON.parse(coordenadas_ruta)
        : coordenadas_ruta;
    } catch {
      parsedCoordenadas = null;
    }
  }

  try {
    const result = await knex('zonas').insert({
      nombre,
      descripcion,
      imagen: ruta_imagen,
      organizacion_id: organizacion_id || null,
      coordenadas_ruta: parsedCoordenadas ? JSON.stringify(parsedCoordenadas) : null,
      color_ruta: color_ruta || '#1976D2',
    });

    const newZona = await knex('zonas').where('id', result[0]).first();
    res.status(201).json({ message: 'Zona creada con éxito', id: newZona.id, zona: parseZonaRuta(newZona) });
  } catch (err) {
    res.status(500).json({
      error: 'Error creando la zona',
      details: err.message || err,
    });
  }
});

router.put('/:id', upload.single('imagen'), async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, organizacion_id, coordenadas_ruta, color_ruta } = req.body;
  const ruta_imagen = req.file ? `uploads/zonas/${req.file.filename}` : null;

  try {
    const zona = await knex('zonas').where('id', id).first();
    if (!zona) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }

    if (ruta_imagen && zona.imagen) {
      const oldFilePath = path.join(__dirname, '..', zona.imagen);
      if (fs.existsSync(oldFilePath)) {
        try {
          fs.unlinkSync(oldFilePath);
        } catch (err) {
          console.warn('Error eliminando archivo anterior:', err.message);
        }
      }
    }

    let parsedCoordenadas = undefined;
    if (coordenadas_ruta !== undefined) {
      if (coordenadas_ruta === null || coordenadas_ruta === '' || coordenadas_ruta === 'null') {
        parsedCoordenadas = null;
      } else {
        try {
          parsedCoordenadas = typeof coordenadas_ruta === 'string'
            ? JSON.parse(coordenadas_ruta)
            : coordenadas_ruta;
        } catch {
          parsedCoordenadas = null;
        }
      }
    }

    const updateFields = {
      ...(nombre !== undefined && { nombre }),
      ...(descripcion !== undefined && { descripcion }),
      ...(organizacion_id !== undefined && { organizacion_id }),
      ...(ruta_imagen && { imagen: ruta_imagen }),
      ...(parsedCoordenadas !== undefined && { coordenadas_ruta: parsedCoordenadas ? JSON.stringify(parsedCoordenadas) : null }),
      ...(color_ruta !== undefined && { color_ruta }),
    };

    const updatedZona = await knex('zonas').where('id', id).update(updateFields);
    if (updatedZona === 0) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }

    res.json({ message: 'Zona actualizada con éxito' });
  } catch (err) {
    res.status(500).json({
      error: 'Error actualizando la zona',
      details: err.message || err,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const zona = await knex('zonas').where('id', id).first();
    if (!zona) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }

    if (zona.imagen) {
      const filePath = path.join(__dirname, '..', zona.imagen);
      if (fs.existsSync(filePath)) {
        try {
          await fs.promises.unlink(filePath);
        } catch (err) {
          console.warn('Error eliminando archivo:', err.message);
        }
      }
    }

    const deletedZona = await knex('zonas').where('id', id).del();
    if (deletedZona === 0) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }

    res.json({ message: 'Zona eliminada con éxito' });
  } catch (err) {
    res.status(500).json({
      error: 'Error eliminando la zona',
      details: err.message || err,
    });
  }
});

module.exports = router;
