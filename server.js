// server.js

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
});

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'recolector_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Manejador de conexiones de socket
io.on('connection', (socket) => {
  // Escuchar actualizaciones de ubicación de un recolector
  socket.on('actualizar_ubicacion', ({ recolectorId, latitud, longitud }) => {
    // Emitir a todos los clientes la nueva ubicación de ese recolector
    io.emit(`ubicacion_recolector_${recolectorId}`, { recolectorId, latitud, longitud, timestamp: Date.now() });
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Servidor backend y frontend corriendo en el puerto ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`El puerto ${PORT} está en uso. Por favor, intenta con otro puerto.`);
  } else {
    console.error(`Error al iniciar el servidor: ${err.message}`);
  }
});
