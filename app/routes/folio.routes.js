const express = require('express');
const router = express.Router();
const folioController = require('../controllers/folio.controller');

// Rutas base CRUD
router.get('/', folioController.getAll.bind(folioController));
router.get('/:id', folioController.getById.bind(folioController));
router.post('/', folioController.create.bind(folioController));
router.put('/:id', folioController.update.bind(folioController));
router.delete('/:id', folioController.delete.bind(folioController));

// Rutas específicas
router.get('/factura/:facturaId', folioController.getByFacturaId.bind(folioController));
router.get('/numero/:numero', folioController.getByNumero.bind(folioController));
router.get('/ultimo/folio', folioController.getLastFolio.bind(folioController));

module.exports = router; 