const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Para permitir el acceso desde el frontend

const app = express();
const port = 3000; // Cambiamos el puerto a 3000 para evitar conflictos

app.use(cors()); // Permitir peticiones desde otros orígenes

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: '190.114.255.204',
  user: 'sebastian',
  password: 'seba',
  database: 'getmed',
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
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

// Consultar 'medico' con su especialidad
app.get('/medico', (req, res) => {
  const query = `
    SELECT 
      medico.ID_Medic, 
      medico.Nom_medic, 
      medico.Apelli_medic, 
      especialidad.Nom_espe 
    FROM 
      medico 
    JOIN 
      especialidad ON medico.ID_Especialidad = especialidad.ID_Especialidad
  `;

  connection.query(query, (err, results) => {
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
