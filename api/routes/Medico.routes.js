// api/routes/medico.routes.js
const express = require('express');
const router = express.Router();
const medico = require('../controllers/General.controller');
const { crearReserva } = require('../controllers/General.controller');
const Login = require('../controllers/login.controller')
const Register = require('../controllers/Register.controller')
const verifyToken = require('../middlewares/auth.middlewares')
const usuarioController = require('../controllers/usuario.controllers');

router.get('/obtenerUsuario', verifyToken.authenticateToken,usuarioController.obtenerUsuarios); // Obtener todos los usuarios

router.post
// Ruta para crear un nuevo usuario
router.post('/crearUsuario', usuarioController.nuevoUsuario);
// Ruta para obtener médicos con especialidad
router.get('/medicos', verifyToken.authenticateToken,medico.findMedicosWithEspecialidad);

router.get('/usuario/:rut',verifyToken.authenticateToken, medico.getUserByRut);

router.get('/reservas/:userId', verifyToken.authenticateToken, medico.findReservasByUser);

router.get('/reserva/:medicoId', verifyToken.authenticateToken,medico.findHorariosWithReservas);

router.post('/reservarhora',verifyToken.authenticateToken, medico.crearReserva);

router.delete('/borrarhora',verifyToken.authenticateToken, medico.eliminarReservaDinamica);

router.delete('/eliminarUsuario',verifyToken.authenticateToken, medico.eliminarUsuario);

router.put('/updatePerfil',verifyToken.authenticateToken, medico.actualizarCredenciales);

router.put('/CambiodeHora', verifyToken.authenticateToken, medico.SolicitarcambioHora);

router.post('/login', Login.InicioSesion);

router.post('/register', Register.nuevoUsuario);

module.exports = router;
