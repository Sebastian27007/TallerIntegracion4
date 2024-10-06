// api/routes/medico.routes.js
const express = require('express');
const router = express.Router();
const medico = require('../controllers/General.controller');
const { crearReserva } = require('../controllers/General.controller');
const Login = require('../controllers/login.controller')
const Register = require('../controllers/Register.controller')
const verifyToken = require('../middlewares/auth.middlewares')
// Ruta para obtener médicos con especialidad
router.get('/medicos', medico.findMedicosWithEspecialidad);

router.get('/reserva', medico.findHorariosWithReservas);

router.post('/reservarhora',verifyToken.authenticateToken, crearReserva)

router.delete('/borrarhora',verifyToken.authenticateToken, medico.eliminarReservaDinamica);

router.delete('/eliminarUsuario',verifyToken.authenticateToken, medico.eliminarUsuario);

router.put('/actualizarCredenciales',verifyToken.authenticateToken, medico.actualizarCredenciales);

router.put('/CambiodeHora', verifyToken.authenticateToken, medico.SolicitarcambioHora);

router.post('/login', Login.InicioSesion);

router.post('/register', Register.nuevoUsuario)

module.exports = router;
