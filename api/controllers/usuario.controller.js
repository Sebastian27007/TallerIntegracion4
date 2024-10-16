// api/controllers/usuario.controller.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db_config/config');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    console.log('Petición GET recibida para obtener usuarios');
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida');
    
    const query = 'SELECT * FROM usuario';
    const rows = await connection.query(query);
    
    console.log('Consulta ejecutada con éxito:', rows);
    res.status(200).json(rows);
    
    connection.release();
  } catch (err) {
    console.error('Error al obtener los usuarios:', err);
    res.status(500).send({
      message: err.message || 'Error al obtener los usuarios.'
    });
  }
};

//Funcion para añadir un usuario
exports.nuevoUsuario = async (req, res) => {
    let connection;
    try {
        // Obtener una conexión del pool
        connection = await pool.getConnection();

        const { rut, Contraseña } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!rut || !Contraseña) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashPassword = bcrypt.hashSync(Contraseña, 10);

        // Consulta SQL para insertar el usuario
        const query = `
            INSERT INTO usuario (rut, Contraseña) 
            VALUES (?, ?)
        `;

        // Ejecutar la consulta
        await connection.query(query, [rut, hashPassword]);

        // Responder con los datos del usuario creado
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            data: {
                rut: rut,
                Contraseña: hashPassword
            }
        });

    } catch (err) {
        // Manejo de errores
        console.error('Error al insertar el usuario:', err);
        res.status(500).send({
            message: err.message || 'Error al insertar el usuario.'
        });
    } finally {
        // Liberar la conexión si está definida
        if (connection) connection.release();
    }
};