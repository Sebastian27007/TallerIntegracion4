// api/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db_config/config');
const medico = require('./routes/Medico.routes')
const usuario = require('./routes/usuario.routes'); // Importar rutas de usuarios
const { authenticateToken } = require('./middlewares/auth.middlewares');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ejemplo de Rutas
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//app.use('/api/users', require('./routes/user.routes'));

// Rutas de asesores (testeo local)
app.use('/api/asesores', require('./routes/asesor.routes'));

app.use('/auth', medico);

// Registrar rutas de usuarios correctamente
app.use('/api/usuarios', usuario); // Usar correctamente el prefijo '/api/usuarios'

// Rutas protegidas (ejemplo)
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Bienvenido, tu RUT es: ${req.user.rut}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server funcionando en el puerto: ${port}`);
});
