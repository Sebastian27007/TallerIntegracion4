// api/controllers/user.controller.js

const User = require('../models/user.models');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content cannot be empty!'
    });
    return;
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    email: req.body.email
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the User.'
      });
    } else {
      res.send(data);
    }
  });
};

// Add more methods (e.g., findById, update, delete)...
