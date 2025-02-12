const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const unlink = util.promisify(fs.unlink);

const uploadDir = 'uploads/publicaciones';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

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


const upload = multer({ storage: storage });

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

router.post('/', upload.single('imagen_url'), async (req, res) => {
  const { titulo, descripcion, activo } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'La imagen es requerida' });
  }

  try {
    const imagen_url = `uploads/publicaciones/${req.file.filename}`;
    const trx = await knex.transaction();
    try {
      const result = await trx('publicaciones').insert({
        titulo,
        imagen_url,
        descripcion,
        activo: activo !== undefined ? activo : true,
      });

      await trx('notificaciones').insert({
        titulo: 'Nueva Publicación',
        mensaje: `Se ha creado una nueva publicación: ${titulo}`,
        prioridad: 'media'
      });

      await trx.commit();

      const newPublicacion = await knex('publicaciones').where('id', result[0]).first();

      res.status(201).json({
        message: 'Publicación creada con éxito',
        id: newPublicacion.id,
        imagen_url: imagen_url
      });
    } catch (trxError) {
      await trx.rollback();
      throw trxError;
    }
  } catch (err) {
    res.status(500).json({
      error: 'Error creando la publicación y notificación',
      details: err.message || err
    });
  }
});

router.put('/:id', upload.single('imagen_url'), async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, activo } = req.body;

  try {
    const updateData = {
      ...(titulo && { titulo }),
      ...(descripcion && { descripcion }),
      ...(activo !== undefined && { activo }),
    };

    if (req.file) {
      updateData.imagen_url = `uploads/publicaciones/${req.file.filename}`;
    }

    const updatedPublicacion = await knex('publicaciones')
      .where('id', id)
      .update(updateData);

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
    const publicacion = await knex('publicaciones').where('id', id).first();

    if (!publicacion) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }

    if (publicacion.imagen_url) {
      try {
        if (fs.existsSync(publicacion.imagen_url)) {
          await unlink(publicacion.imagen_url);
        }
      } catch (unlinkError) {
        console.error('Error al eliminar el archivo:', unlinkError);
      }
    }

    const deletedPublicacion = await knex('publicaciones').where('id', id).del();

    res.json({ message: 'Publicación eliminada con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando la publicación', details: err.message || err });
  }
});

module.exports = router;
