// api/index.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./config/db.config');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Routes (You will define these later)
app.use('/api/users', require('./routes/user.routes'));

// Start the server
app.listen(port, () => {
  console.log(`Server funcionando en el puerto: ${port}`);
});
