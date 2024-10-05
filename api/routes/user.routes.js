// api/routes/user.routes.js

const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controllers');

// Create a new User
router.post('/', users.create);

// Add more routes as needed (e.g., GET, PUT, DELETE)...

module.exports = router;
