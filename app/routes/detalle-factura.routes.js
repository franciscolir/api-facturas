const express = require('express');
const router = express.Router();
const detalleFacturaController = require('../controllers/detalle-factura.controller');

// Rutas base CRUD
router.get('/', detalleFacturaController.getAll.bind(detalleFacturaController));
router.get('/:id', detalleFacturaController.getById.bind(detalleFacturaController));
router.post('/', detalleFacturaController.create.bind(detalleFacturaController));
router.put('/:id', detalleFacturaController.update.bind(detalleFacturaController));
router.delete('/:id', detalleFacturaController.delete.bind(detalleFacturaController));

// Rutas específicas
router.get('/factura/:facturaId', detalleFacturaController.getByFacturaId.bind(detalleFacturaController));
router.get('/producto/:productoId', detalleFacturaController.getByProductoId.bind(detalleFacturaController));
router.post('/bulk', detalleFacturaController.createMany.bind(detalleFacturaController));

module.exports = router; 