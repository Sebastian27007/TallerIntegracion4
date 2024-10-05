// api/config/db.config.js
const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST, // Dirección de tu servidor de base de datos
  user: process.env.DB_USER, // Tu usuario
  password: process.env.DB_PASSWORD, // Tu contraseña
  database: process.env.DB_NAME, // Nombre de la base de datos
  connectionLimit: 8 // Límite de conexiones
});

module.exports = pool;
