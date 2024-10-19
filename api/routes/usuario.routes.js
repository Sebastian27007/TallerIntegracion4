// api/routes/usuario.routes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controllers');

router.get('/', usuarioController.obtenerUsuarios); // Obtener todos los usuarios
router.post('/crear', usuarioController.nuevoUsuario); // Crear un nuevo usuario
router.post('/login', usuarioController.loginUsuario); // Login de usuarios

module.exports = router;
