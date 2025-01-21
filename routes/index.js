// routes/index.js

const express = require('express');
const usuariosRoutes = require('./usuarios');
const organizacionRoutes = require('./organizacion');
const recolectoresRoutes = require('./recolectores');
const reportesRoutes = require('./reportes');

const router = express.Router();

router.use('/usuarios', usuariosRoutes);
router.use('/organizacion', organizacionRoutes);
router.use('/recolectores', recolectoresRoutes);
router.use('/reportes', reportesRoutes);

module.exports = router;
