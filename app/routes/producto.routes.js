const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// Rutas base CRUD
router.get('/', productoController.getAll.bind(productoController));
router.get('/:id', productoController.getById.bind(productoController));
router.post('/', productoController.create.bind(productoController));
router.put('/:id', productoController.update.bind(productoController));
router.delete('/:id', productoController.delete.bind(productoController));

// Rutas específicas
router.get('/codigo/:codigo', productoController.getByCodigo.bind(productoController));
router.get('/categoria/:categoria', productoController.getByCategoria.bind(productoController));

module.exports = router; 