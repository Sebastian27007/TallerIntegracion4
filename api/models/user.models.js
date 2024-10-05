// api/models/user.model.js

const db = require('../db_config/config');

const User = function(user) {
  this.username = user.username;
  this.email = user.email;
};

User.create = (newUser, result) => {
  db.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }

    console.log('Created user: ', { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, res) => {
    if (err) {
      console.log('Error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('Found user: ', res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

// Add more methods as needed...

module.exports = User;
