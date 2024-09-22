const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Para permitir el acceso desde el frontend

const app = express();
const port = 3306;

app.use(cors()); // Permitir peticiones desde otros orígenes

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: '190.114.255.204',
  user: 'sebastian',
  password: 'seba',
  database: 'getmed',
});

// Rutas para consultar cada tabla

// Consultar 'especialidad'
app.get('/especialidad', (req, res) => {
  connection.query('SELECT * FROM especialidad', (err, results) => {
    if (err) {
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.json(results);
  });
});

// Consultar 'horario'
app.get('/horario', (req, res) => {
  connection.query('SELECT * FROM horario', (err, results) => {
    if (err) {
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.json(results);
  });
});

// Consultar 'medico'
app.get('/medico', (req, res) => {
  connection.query('SELECT * FROM medico', (err, results) => {
    if (err) {
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.json(results);
  });
});

// Consultar 'notificacion'
app.get('/notificacion', (req, res) => {
  connection.query('SELECT * FROM notificacion', (err, results) => {
    if (err) {
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.json(results);
  });
});

// Consultar 'reserva'
app.get('/reserva', (req, res) => {
  connection.query('SELECT * FROM reserva', (err, results) => {
    if (err) {
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.json(results);
  });
});

// Consultar 'usuario'
app.get('/usuario', (req, res) => {
  connection.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      res.status(500).send('Error en la base de datos');
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API ejecutándose en http://localhost:${port}`);
});
