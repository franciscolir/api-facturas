const express = require('express');
const router = express.Router();
const condicionPagoController = require('../controllers/condicion-pago.controller');

// Rutas base CRUD
router.get('/', condicionPagoController.getAll.bind(condicionPagoController));
router.get('/:id', condicionPagoController.getById.bind(condicionPagoController));
router.post('/', condicionPagoController.create.bind(condicionPagoController));
router.put('/:id', condicionPagoController.update.bind(condicionPagoController));
router.delete('/:id', condicionPagoController.delete.bind(condicionPagoController));

// Rutas específicas
router.get('/plazo/:plazo', condicionPagoController.getByPlazo.bind(condicionPagoController));
router.get('/descripcion/:descripcion', condicionPagoController.getByDescripcion.bind(condicionPagoController));

module.exports = router; 