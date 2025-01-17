const express = require('express');
const router = express.Router();
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);
const { parse, format } = require('date-fns');

const fs = require('fs');
const multer = require('multer');
const ExcelJS = require('exceljs');
const upload = multer({ dest: 'uploads/' });

const RECOLECTORES_COLUMNS = [
  { header: 'Nombre Recolector', key: 'nombre_recolector', width: 50 },
  { header: 'Teléfono Recolector', key: 'telefono_recolector', width: 20 },
  { header: 'Zona Responsable', key: 'zona_responsable', width: 50 },
  { header: 'Ubicación Enlace', key: 'ubicacion_enlace', width: 50 },
  { header: 'Fecha Ubicación Actualizada', key: 'fecha_ubicacion_actualizada', width: 20 },
  { header: 'Estado', key: 'estado', width: 15 },
];

// Descargar plantilla
router.get('/template', async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Plantilla Recolectores');

    worksheet.columns = RECOLECTORES_COLUMNS;
    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=Plantilla_Recolectores.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: 'Error al generar la plantilla', details: error.message });
  }
});

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
        ? format(new Date(recolector.fecha_ubicacion_actualizada), 'dd/MM/yyyy HH:mm:ss')
        : null,
    };

    res.json(formattedRecolector);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo el recolector', details: err.message || err });
  }
});

// Cargar datos por excel
router.post('/bulk-upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet(1);
    const failedRecords = [];

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const record = {
        nombre_recolector: row.getCell(1).value?.toString().trim() || null,
        telefono_recolector: row.getCell(2).value?.toString().trim() || null,
        zona_responsable: row.getCell(3).value?.toString().trim() || null,
        ubicacion_enlace: row.getCell(4).value?.toString().trim() || null,
        // Si no se proporciona 'fecha_ubicacion_actualizada', asignar la fecha y hora actual
        fecha_ubicacion_actualizada: row.getCell(5).value
          ? row.getCell(5).value.toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString()
          : new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString(),
        estado: row.getCell(6).value?.toString().trim() || 'activo',
      };

      if (!record.nombre_recolector || !record.estado) {
        console.warn(`Fila ${i} ignorada: faltan campos obligatorios.`);
        continue;
      }

      try {
        await knex('recolectores_desechos').insert(record);
      } catch (error) {
        console.error(`Error en fila ${i}:`, error.message);
        failedRecords.push(record);
      }
    }

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error eliminando archivo temporal:', err.message);
      } else {
        console.log('Archivo temporal eliminado:', req.file.path);
      }
    });

    if (failedRecords.length > 0) {
      const failedWorkbook = new ExcelJS.Workbook();
      const failedWorksheet = failedWorkbook.addWorksheet('Errores');

      failedWorksheet.columns = RECOLECTORES_COLUMNS;
      failedWorksheet.getRow(1).font = { bold: true };

      failedRecords.forEach((record) => {
        failedWorksheet.addRow(record);
      });

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=Errores_Carga_Recolectores.xlsx'
      );

      await failedWorkbook.xlsx.write(res);
      return res.end();
    }

    res.status(200).json({ message: 'Datos cargados correctamente.' });
  } catch (err) {
    console.error('Error al procesar el archivo:', err.message);

    fs.unlink(req.file.path, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error eliminando archivo temporal:', unlinkErr.message);
      }
    });

    res.status(500).json({ error: 'Error al procesar el archivo', details: err.message });
  }
});

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
    const fechaActualizada = ubicacion_enlace
      ? new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString()
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

    const newRecolectorId = result[0];

    res.status(201).json({
      message: 'Recolector creado con éxito',
      id: newRecolectorId
    });

  } catch (err) {
    res.status(500).json({
      error: 'Error creando el recolector',
      details: err.message || err
    });
  }
});

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
    // Buscar al recolector por su ID
    const recolector = await knex('recolectores_desechos').where('id', id).first();

    if (!recolector) {
      return res.status(404).json({ error: 'Recolector no encontrado' });
    }

    // Extraer el enlace usando una expresión regular
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const enlaceExtraido = ubicacion_enlace?.match(linkRegex)?.[0] || null;

    const updates = {
      nombre_recolector,
      telefono_recolector,
      zona_responsable,
      ubicacion_enlace: enlaceExtraido,
      estado,
      organizacion_id,
      fecha_ubicacion_actualizada: enlaceExtraido
        ? new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString()
        : recolector.fecha_ubicacion_actualizada,
    };

    // Filtrar solo las claves con valores definidos
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    // Actualizar el recolector
    const updatedRecolector = await knex('recolectores_desechos')
      .where('id', id)
      .update(filteredUpdates);

    if (updatedRecolector === 0) {
      return res.status(404).json({ error: 'Recolector no encontrado al intentar actualizar' });
    }

    // Obtener el recolector actualizado
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
