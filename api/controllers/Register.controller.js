const bcrypt = require('bcrypt');
const pool = require('../db_config/config');

exports.nuevoUsuario = async (req, res) => {
  // Extraer los datos del cuerpo de la solicitud
  const { rut, Contraseña } = req.body;

  // Validar que los campos obligatorios estén presentes
  if (!rut || !Contraseña) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  let connection;
  try {
    // Verifica si el usuario ya existe
    const userExists = await pool.query('SELECT * FROM usuario WHERE rut = ?', [rut]);

    if (userExists.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Hashear la contraseña antes de la inserción
    const hashPassword = bcrypt.hashSync(Contraseña, 10);

    // Obtener una conexión del pool
    const connection = await pool.getConnection();

    // Consulta SQL para insertar el nuevo usuario
    const query = `
      INSERT INTO usuario (rut, Contraseña) 
      VALUES (?, ?)
    `;

    // Ejecutar la consulta de inserción
    const result = await connection.query(query, [rut, hashPassword]);

    // Responder con los datos del usuario creado
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      data: {
        ID_User: result.insertId.toString(),  // Obtén el ID del usuario recién creado
        rut: rut,
        Contraseña: hashPassword  // No es buena práctica devolver la contraseña hasheada
      }
    });

    // Liberar la conexión
    connection.release();
  } catch (err) {
    // Manejo de errores
    res.status(500).send({
      message: err.message || 'Error al crear nuevo usuario.'
    });
  } finally {
    // Asegúrate de liberar la conexión aquí
    if (connection) connection.release();
  }
};
