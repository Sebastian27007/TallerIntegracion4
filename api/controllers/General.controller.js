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

exports.findHorariosWithReservas = async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const medicoId = Number(req.params.medicoId);  // Convertir a número, si es necesario

    console.log("ID del médico recibido:", medicoId);  // Verificar que el ID del médico se recibe correctamente

    // Si medicoId es NaN, devuelve un error
    if (isNaN(medicoId)) {
      return res.status(400).json({ message: "medicoId debe ser un número válido." });
  }
    const query = `
      SELECT 
          horario.ID_Horario, 
          horario.FechaHora, 
          horario.ID_Medic, 
          reserva.ID_Reserva, 
          reserva.FechaCreacion 
        FROM horario
        LEFT JOIN reserva ON reserva.ID_Horario = horario.ID_Horario
        WHERE horario.ID_Medic = ?;
    `;

    console.log("Ejecutando consulta SQL:", query, medicoId);  // Mostrar la consulta y el valor de medicoId

    const rows = await connection.query(query, [medicoId]);
    console.log("Resultados obtenidos:", rows);  // Mostrar los resultados obtenidos de la consulta

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error en la consulta:", err.message);
    res.status(500).send({
      message: err.message || "Error al obtener los horarios con reservas."
    });
  } finally {
    if (connection) connection.release();  // Liberar la conexión en el bloque finally
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
        INSERT INTO reserva (ID_User, ID_Horario, FechaCreacion, Cancelacion) 
        VALUES (?, ?, ?, ?)
      `;
  
      // Ejecutar la consulta
      const result = await connection.query(query, [ID_User, ID_Horario, FechaCreacion, Cancelacion]);
  
      // Responder con los datos de la reserva creada
      res.status(201).json({
        message: 'Reserva creada exitosamente',
        data: {
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
  const { rut, nuevaContraseña } = req.body;

    // Verificar que el rut y la nueva contraseña estén presentes
    if (!rut || !nuevaContraseña) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    try {
        // Buscar al usuario en la base de datos
        const [user] = await pool.query('SELECT * FROM usuarios WHERE rut = ?', [rut]);

        // Verificar si el usuario existe
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Hashear la nueva contraseña
        const hashPassword = await bcrypt.hash(nuevaContraseña, 10);

        // Actualizar la contraseña en la base de datos
        await pool.query('UPDATE usuarios SET Contraseña = ? WHERE rut = ?', [hashPassword, rut]);

        res.json({ message: 'Credenciales actualizadas exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar credenciales', error: error.message });
    }
};
// petición para realizar el cambio de hora
exports.SolicitarcambioHora = async (req, res) => {
  const { ID_Reserva } = req.params;
  const { ID_Horario } = req.body;

  // Validar que se proporcionen los datos necesarios
  if (!ID_Horario || !ID_Reserva) {
      return res.status(400).json({ message: 'ID de la reserva y nuevo horario son obligatorios' });
  }

  try {
      // Verificar si la reserva existe
      const [reserva] = await pool.query('SELECT * FROM reserva WHERE ID_Reserva = ?', [ID_Reserva]);

      if (reserva.length === 0) {
          return res.status(404).json({ message: 'Reserva no encontrada' });
      }

      // Actualizar el horario de la reserva
      await pool.query('UPDATE reserva SET ID_Horario = ? WHERE ID_Reserva = ?', [ID_Horario, ID_Reserva]);

      res.json({ message: 'Horario actualizado exitosamente' });
  } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el horario', error: error.message });
  }
};

// Función para limpiar el formato del RUT
const limpiarRut = (rut) => {
  return rut.replace(/[.-]/g, ''); // Elimina puntos y guiones
};

// Función para formatear el RUT agregando el guion antes del último dígito
const formatearRut = (rut) => {
  const cuerpo = rut.slice(0, -1); // Obtiene todos los caracteres menos el último (el dígito verificador)
  const digitoVerificador = rut.slice(-1); // Obtiene el último carácter
  return `${cuerpo}-${digitoVerificador}`; // Retorna el RUT formateado con guion
};

// Controlador para obtener el ID del usuario basado en el rut (como string)
exports.getUserByRut = async (req, res) => {
  try {
    // Obtener la conexión a la base de datos
    const connection = await pool.getConnection();

    // Obtener el rut desde los parámetros de la URL
    let { rut } = req.params;

    // Log para depurar el valor de rut
    console.log('RUT recibido (string):', rut);

    // Verificar si se proporcionó el rut
    if (!rut) {
      return res.status(400).json({ message: 'El rut es obligatorio' });
    }

    // Consulta SQL para buscar el ID del usuario basado en el rut
    const query = 
      `SELECT ID_User, rut
      FROM usuario
      WHERE rut = ?;`;

    // Ejecutar la consulta SQL
    const [rows] = await connection.query(query, [rut]);

    // Verificar si se encontró un usuario con ese rut
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Log para depurar el resultado de la consulta
    console.log('Resultado de la consulta:', rows);

    // Devolver el resultado en formato JSON
    res.status(200).json(rows);

    // Liberar la conexión a la base de datos
    connection.release();

  } catch (error) {
    // Capturar y mostrar errores en la consola
    console.error('Error al obtener el ID del usuario por rut:', error);
    // Respuesta en caso de error del servidor
    res.status(500).json({ message: 'Error al obtener el ID del usuario' });
  }
};
