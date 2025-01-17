require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// Habilitar CORS para permitir solicitudes desde otros dominios
app.use(cors({
  origin: process.env.CORS_ORIGIN || '',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para analizar JSON
app.use(express.json());

// Configurar la ruta para los archivos estáticos (carga de archivos)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Rutas de la API
app.use('/api', routes);

// Servir los archivos estáticos de React (frontend)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Redirigir todas las demás solicitudes al archivo index.html de React, excepto las rutas de la API
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next(); // Si la ruta comienza con /api, sigue al siguiente manejador (no sirve index.html)
  }
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'gatilin_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor backend y frontend corriendo en el puerto ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} está en uso. Por favor, intenta con otro puerto.`);
  } else {
    console.error(`Error al iniciar el servidor: ${err.message}`);
  }
});
