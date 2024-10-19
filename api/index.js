// api/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db_config/config');
const medico = require('./routes/Medico.routes')
const usuarios = require('./routes/usuario.routes')
const { authenticateToken } = require('./middlewares/auth.middlewares');
const cors = require('cors');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ejemplo de Rutas
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Habilitar CORS para todas las solicitudes
app.use(cors({
  origin: 'https://190.114.255.204', // Aquí puedes especificar dominios permitidos, como 'http://tu-app.com/'
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // Si necesitas enviar cookies o autenticación
}));
// Rutas de asesores (testeo local)
app.use('/api/asesores', require('./routes/asesor.routes'));

app.use('/auth', medico);

app.use('/api/usuarios', usuarios);
// Rutas protegidas (ejemplo)
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Bienvenido, tu RUT es: ${req.user.rut}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server funcionando en el puerto: ${port}`);
});
