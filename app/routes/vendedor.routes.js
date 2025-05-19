const express = require('express');
const router = express.Router();
const vendedorController = require('../controllers/vendedor.controller');

// Rutas base CRUD
router.get('/', vendedorController.getAll.bind(vendedorController));
router.get('/:id', vendedorController.getById.bind(vendedorController));
router.post('/', vendedorController.create.bind(vendedorController));
router.put('/:id', vendedorController.update.bind(vendedorController));
router.delete('/:id', vendedorController.delete.bind(vendedorController));

// Rutas específicas
router.get('/codigo/:codigo', vendedorController.getByCode.bind(vendedorController));

module.exports = router; 