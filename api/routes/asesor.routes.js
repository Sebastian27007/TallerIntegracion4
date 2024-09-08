// api/routes/asesor.routes.js

const express = require('express');
const router = express.Router();
const asesores = require('../controllers/asesor.controllers');

// Ruta para obtener todos los asesores
router.get('/', asesores.findAll);

// Ruta para agregar un nuevo asesor
router.post('/', asesores.create);


module.exports = router;
