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

// Login de usuario
exports.loginUsuario = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const { rut, Contraseña } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!rut || !Contraseña) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        // Buscar el usuario por su rut
        const query = 'SELECT * FROM usuario WHERE rut = ?';
        const rows = await connection.query(query, [rut]);

        // Verificar si se encontró el usuario
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const usuario = rows[0];

        // Verificar la contraseña
        const isPasswordValid = bcrypt.compareSync(Contraseña, usuario.Contraseña);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: usuario.id, rut: usuario.rut },
            'secreto_para_el_token', // Usa una variable de entorno para el secreto
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        // Responder con el token
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: token,
            rut: usuario.rut
        });

    } catch (err) {
        console.error('Error en el login:', err);
        res.status(500).send({
            message: err.message || 'Error en el login.'
        });
    } finally {
        if (connection) connection.release();
    }
};