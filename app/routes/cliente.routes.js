const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

// Rutas base CRUD
router.get('/', clienteController.getAll.bind(clienteController));
router.get('/:id', clienteController.getById.bind(clienteController));
router.post('/', clienteController.create.bind(clienteController));
router.put('/:id', clienteController.update.bind(clienteController));
router.delete('/:id', clienteController.delete.bind(clienteController));

// Rutas específicas
router.get('/rut/:rut', clienteController.getByRut.bind(clienteController));

module.exports = router; 