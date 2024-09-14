const pool = require('../db_config/config');

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
  
      const { ID_User, ID_Horario, FechaCreacion, Cancelacion } = req.body;
  
      // Validar que los campos obligatorios estén presentes
      if (!ID_User || !ID_Horario || !FechaCreacion) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
  
      // Generar un ID de reserva único (opcional)
      const ID_Reserva = Math.floor(Math.random() * 1000000);
  
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
          ID_Reserva: ID_Reserva,
          ID_User: ID_User,
          ID_Horario: ID_Horario,
          FechaCreacion: FechaCreacion,
          Cancelacion: Cancelacion,
          insertId: result.insertId
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
//Funcion para eliminar una reserva
//Funcion para añadir un usuario
//Funcion para eliminar un usuario