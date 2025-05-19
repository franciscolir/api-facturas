const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura.controller');

// Rutas base CRUD
router.get('/', facturaController.getAll.bind(facturaController));
router.get('/:id', facturaController.getById.bind(facturaController));
router.post('/', facturaController.create.bind(facturaController));
router.put('/:id', facturaController.update.bind(facturaController));
router.delete('/:id', facturaController.delete.bind(facturaController));

// Rutas específicas
router.get('/details/all', facturaController.getAllWithDetails.bind(facturaController));
router.get('/cliente/:clienteId', facturaController.getByClienteId.bind(facturaController));
router.get('/vendedor/:vendedorId', facturaController.getByVendedorId.bind(facturaController));
router.get('/fecha/:fecha', facturaController.getByFecha.bind(facturaController));

module.exports = router; 