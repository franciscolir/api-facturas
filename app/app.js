const express = require('express');
const userRoutes = require('./routes/user.routes');
const db = require('../config/db');

const app = express();

// Middleware
app.use(express.json());

// Conectar a la base de datos
db.sync().then(() => console.log('Base de datos conectada'));

// Rutas
app.use('/api/users', userRoutes);

module.exports = app;

