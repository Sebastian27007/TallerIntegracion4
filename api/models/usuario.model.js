// api/models/usuario.model.js
const db = require('../db_config/config');
const bcrypt = require('bcrypt');

const Usuario = function(usuario) {
  this.rut = usuario.rut;
  this.password = usuario.password;
};

Usuario.crear = async (nuevoUsuario, result) => {
  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(nuevoUsuario.password, 10);
    nuevoUsuario.password = hashedPassword;

    // Inserción en la base de datos
    db.query('INSERT INTO usuarios SET ?', { rut: nuevoUsuario.rut, password: hashedPassword }, (err, res) => {
      if (err) {
        console.log('Error: ', err);
        result(err, null);
        return;
      }
      console.log('Usuario creado: ', { id: res.insertId, ...nuevoUsuario });
      result(null, { id: res.insertId, ...nuevoUsuario });
    });
  } catch (error) {
    result(error, null);
  }
};

Usuario.findById = (id, result) => {
  db.query('SELECT * FROM usuarios', (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('Usuario encontrado: ', res);
      result(null, res);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

Usuario.eliminar = (id, result) => {
  db.query('DELETE FROM usuarios WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Usuario eliminado con ID: ', id);
    result(null, res);
  });
};

module.exports = Usuario;
