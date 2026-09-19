// createDatabase.js

require('dotenv').config();
const knex = require('knex');

const dbName = process.env.DB_NAME || 'recolector_db';

const knexConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  }
};

const db = knex(knexConfig);

db.raw(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``)
  .then(() => {
    console.log(`Base de datos "${dbName}" creada o ya existe`);
  })
  .catch((err) => {
    console.error('Error creando la base de datos:', err);
  })
  .finally(() => {
    db.destroy();
  });
