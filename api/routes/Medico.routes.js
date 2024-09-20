// api/routes/medico.routes.js

const express = require('express');
const router = express.Router();
const medico = require('../controllers/General.controller');
const { crearReserva } = require('../controllers/General.controller');

// Ruta para obtener médicos con especialidad
router.get('/medicos', medico.findMedicosWithEspecialidad);

router.get('/reserva', medico.findHorariosWithReservas);

router.post('/reservarhora', crearReserva)

router.delete('/borrarhora', medico.eliminarReservaDinamica);

router.post('/nuevoUsuario', medico.nuevoUsuario);

router.delete('/eliminarUsuario', medico.eliminarUsuario);

router.put('/actualizarCredenciales', medico.actualizarCredenciales);

router.put('/CambiodeHora', medico.SolicitarcambioHora);

module.exports = router;
