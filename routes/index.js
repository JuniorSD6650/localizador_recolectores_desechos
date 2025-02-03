// routes/index.js

const express = require('express');
const usuariosRoutes = require('./usuarios');
const organizacionRoutes = require('./organizacion');
const zonasRoutes = require('./zonas');
const callesRoutes = require('./calles');
const recolectoresRoutes = require('./recolectores');
const reportesRoutes = require('./reportes');
const notificacionesRoutes = require('./notificaciones');
const asignacionesVeRoutes = require('./asignaciones_vehiculos');
const publicacionesRoutes = require('./publicaciones');
const jornadasRoutes = require('./jornadas');
const asignacionesZoRoutes = require('./asignaciones_zonas');

const router = express.Router();

router.use('/usuarios', usuariosRoutes);
router.use('/organizacion', organizacionRoutes);
router.use('/zonas', zonasRoutes);
router.use('/calles', callesRoutes);
router.use('/recolectores', recolectoresRoutes);
router.use('/reportes', reportesRoutes);
router.use('/notificaciones', notificacionesRoutes);
router.use('/usuario-recolector', asignacionesVeRoutes);
router.use('/publicaciones', publicacionesRoutes);
router.use('/jornadas', jornadasRoutes);
router.use('/zona-recolector', asignacionesZoRoutes);

module.exports = router;
