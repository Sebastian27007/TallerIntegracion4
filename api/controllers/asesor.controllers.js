// api/controllers/asesor.controller.js

const Asesor = require('../models/asesor.models');

// Obtener todos los asesores
exports.findAll = (req, res) => {
  Asesor.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Ocurrió un error al obtener los asesores.'
      });
    } else {
      res.send(data);
    }
  });
};

// Crear un nuevo asesor
exports.create = (req, res) => {
    // Validar el request
    if (!req.body) {
      res.status(400).send({
        message: "El contenido no puede estar vacío"
      });
      return;
    }

  // Crear un asesor con los datos recibidos
const nuevoAsesor = new Asesor({
    ID_asesor: req.body.ID_asesor,
    Nombre: req.body.Nombre,
    Email: req.body.Email,
    Carrera: req.body.Carrera,
    Rol: req.body.Rol,
    Especialidad: req.body.Especialidad
    // Agrega otros campos si es necesario
});

  // Guardar el asesor en la base de datos
Asesor.create(nuevoAsesor, (err, data) => {
    if (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear el asesor."
    });
} else {
    res.send(data);
    }
        });
};