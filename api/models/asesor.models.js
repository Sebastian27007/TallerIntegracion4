// api/models/asesor.model.js

const db = require('../db_config/config');

const Asesor = function(asesor) {
  this.ID_asesor = asesor.ID_asesor
  this.Nombre = asesor.Nombre;
  this.Email = asesor.Email;
  this.Carrera = asesor.Carrera;
  this.Rol = asesor.Rol;
  this.Especialidad = asesor.Especialidad;
  // Agrega más campos si tu tabla tiene más columnas
};

Asesor.getAll = (result) => {
  db.query('SELECT * FROM asesores', (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }

    console.log('Asesores: ', res);
    result(null, res);
  });
};


// Método para agregar un nuevo asesor
Asesor.create = (nuevoAsesor, result) => {
    db.query("INSERT INTO asesores SET ?", nuevoAsesor, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
  
      console.log("Asesor creado: ", { id: res.insertId, ...nuevoAsesor });
      result(null, { id: res.insertId, ...nuevoAsesor });
    });
  };
module.exports = Asesor;
