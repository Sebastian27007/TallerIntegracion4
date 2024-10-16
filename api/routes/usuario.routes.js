// api/routes/usuario.routes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.get('/', usuarioController.obtenerUsuarios); // Obtener todos los usuarios

// Ruta para crear un nuevo usuario
router.post('/crear', usuarioController.nuevoUsuario);

module.exports = router;