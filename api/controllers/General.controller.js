//import bcrypt from 'bcrypt';
const pool = require('../db_config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Obtener la información del médico junto con su especialidad
exports.findMedicosWithEspecialidad = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // Consulta SQL con INNER JOIN
    const query = `
      SELECT 
        medico.ID_Medic, 
        Nom_medic, 
        Apelli_medic, 
        Correo_medico, 
        especialidad.ID_Especialidad, 
        especialidad.Nom_espe 
      FROM medico
      INNER JOIN especialidad ON especialidad.ID_Medic = medico.ID_Medic;
    `;

    const rows = await connection.query(query);

    // Respuesta al cliente con los datos obtenidos
    res.status(200).json(rows);

    connection.release(); // Liberar la conexión
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error al obtener los médicos con especialidad."
    });
  }
};

// Obtener la información del horario junto con reservas
exports.findHorariosWithReservas = async (req, res) => {
    try {
      const connection = await pool.getConnection();
      
      const query = `
        SELECT 
          horario.ID_Horario, 
          horario.FechaHora, 
          horario.ID_Medic, 
          reserva.ID_Reserva, 
          reserva.FechaCreacion 
        FROM reserva
        INNER JOIN horario ON reserva.ID_Horario = horario.ID_Horario;
      `;
  
      const rows = await connection.query(query);
  
      res.status(200).json(rows);
      connection.release();
    } catch (err) {
      res.status(500).send({
        message: err.message || "Error al obtener los horarios con reservas."
      });
    }
  };

// Controlador para añadir una nueva reserva
exports.crearReserva = async (req, res) => {
    try {
      // Obtener una conexión del pool
      const connection = await pool.getConnection();
  
      const { ID_Reserva, ID_User, ID_Horario, FechaCreacion, Cancelacion } = req.body;
  
      // Validar que los campos obligatorios estén presentes
      if (!ID_User || !ID_Horario || !FechaCreacion) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      } 
  
      // Consulta SQL para insertar la reserva
      const query = `
        INSERT INTO reserva (ID_Reserva, ID_User, ID_Horario, FechaCreacion, Cancelacion) 
        VALUES (?, ?, ?, ?, ?)
      `;
  
      // Ejecutar la consulta
      const result = await connection.query(query, [ID_Reserva, ID_User, ID_Horario, FechaCreacion, Cancelacion]);
  
      // Responder con los datos de la reserva creada
      res.status(201).json({
        message: 'Reserva creada exitosamente',
        data: {
          ID_Reserva: ID_Reserva.toString(),
          ID_User: ID_User.toString(),
          ID_Horario: ID_Horario.toString(),
          FechaCreacion: FechaCreacion,
          Cancelacion: Cancelacion,
          insertId: result.insertId.toString()
        }
      });
  
      // Liberar la conexión
      connection.release();
    } catch (err) {
      // Manejo de errores
      res.status(500).send({
        message: err.message || 'Error al insertar la reserva.'
      });
    }
  };

// Controlador para eliminar una reserva de forma dinámica
exports.eliminarReservaDinamica = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const connection = await pool.getConnection();

    // Obtener los parámetros del cuerpo de la solicitud
    const { column, value } = req.body;

    // Validar que los campos obligatorios estén presentes
    if (!column || !value) {
      return res.status(400).json({ error: 'Faltan el nombre de la columna o el valor.' });
    }

    // Escapar el nombre de la columna para prevenir inyecciones SQL
    const columnEscaped = `\`${column}\``; // Escapar la columna manualmente para MariaDB

    // Consulta SQL para eliminar la reserva de forma dinámica
    const query = `DELETE FROM reserva WHERE ${columnEscaped} = ?`;

    // Ejecutar la consulta
    const result = await connection.query(query, [value]); // `connection.query` en `mariadb` no devuelve un arreglo

    // Verificar si se eliminó alguna fila
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'No se encontró ninguna reserva con ese criterio.' });
    } else {
      res.status(200).json({ message: 'Reserva eliminada exitosamente.' });
    }

    // Liberar la conexión
    connection.release();
  } catch (err) {
    // Manejo de errores
    res.status(500).send({
      message: err.message || 'Error al eliminar la reserva.'
    });
  }
};

//Funcion para añadir un usuario
exports.nuevoUsuario = async (req, res) => {
  try {
    // Obtener una conexión del pool
    const connection = await pool.getConnection();

    const { ID_User, rut, Contraseña } = req.body;

    // Validar que los campos obligatorios estén presentes
    if (!ID_User || !rut || !Contraseña) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    } 

    // Consulta SQL para insertar la reserva
    const query = `
      INSERT INTO usuario (ID_User, rut, Contraseña) 
      VALUES (?, ?, ?)
    `;

    // Ejecutar la consulta
    const result = await connection.query(query, [ID_User, rut, Contraseña]);

    const hashPassword = bcrypt.hashSync(Contraseña, 10);
    // Responder con los datos de la reserva creada
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      data: {
        ID_User: ID_User,
        rut: rut,
        Contraseña: hashPassword
      }
    });

    // Liberar la conexión
    connection.release();
  } catch (err) {
    // Manejo de errores
    res.status(500).send({
      message: err.message || 'Error al insertar la reserva.'
    });
  }
};
//Funcion para eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const connection = await pool.getConnection();

    // Obtener los parámetros del cuerpo de la solicitud
    const { column, value } = req.body;

    // Validar que los campos obligatorios estén presentes
    if (!column || !value) {
      return res.status(400).json({ error: 'Faltan el nombre de la columna o el valor.' });
    }

    // Escapar el nombre de la columna para prevenir inyecciones SQL
    const columnEscaped = `\`${column}\``; // Escapar la columna manualmente para MariaDB

    // Consulta SQL para eliminar la reserva de forma dinámica
    const query = `DELETE FROM usuario WHERE ${columnEscaped} = ?`;

    // Ejecutar la consulta
    const result = await connection.query(query, [value]); // `connection.query` en `mariadb` no devuelve un arreglo

    // Verificar si se eliminó alguna fila
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'No se encontró ningun usuario con ese criterio' });
    } else {
      res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    }

    // Liberar la conexión
    connection.release();
  } catch (err) {
    // Manejo de errores
    res.status(500).send({
      message: err.message || 'Error al eliminar el usaurio'
    });
  }
};

// actualizar credenciales
exports.actualizarCredenciales = async (req, res) => {
  
};
// petición para realizar el cambio de hora
exports.SolicitarcambioHora = async (req, res) => {

};

//logeo
exports.InicioSesion = async (req, res) => {
  const { rut, Contraseña } = req.body;
  try{
      const connection = await pool.getConnection();
      const rows = await connection.query('SELECT * FROM usuario WHERE rut = ?', [rut]);

      if (rows.lenght == 0){
          return res.status(400).json({message: 'Usuario no encontrado'})
      }
      
      const user = rows[0];

      const isPasswordValid = await bcrypt.compare(Contraseña, user.Contraseña);
      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
          { rut: user.rut }, 
          'mi_secreto', 
          { expiresIn: '1h' }
      );

      res.json({ token });
      conn.end();

  }catch{
      console.error(error);
      res.status(500).json({ message: 'Error del servidor' });
  }
};