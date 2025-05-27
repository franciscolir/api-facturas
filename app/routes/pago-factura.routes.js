/**
 * Rutas para la gestión de pagos de facturas
 * Define los endpoints para operaciones CRUD y funcionalidades específicas
 * 
 * @module pago-factura.routes
 */
const express = require('express');
const router = express.Router();
const pagoFacturaController = require('../controllers/pago-factura.controller');

// ==========================================
// Rutas CRUD Base
// ==========================================
router.get('/', pagoFacturaController.getAll.bind(pagoFacturaController));
router.get('/:id', pagoFacturaController.getById.bind(pagoFacturaController));
router.post('/', pagoFacturaController.create.bind(pagoFacturaController));
router.put('/:id', pagoFacturaController.update.bind(pagoFacturaController));
router.delete('/:id', pagoFacturaController.delete.bind(pagoFacturaController));

// ==========================================
// Rutas Específicas
// ==========================================

// Obtener todos los pagos con detalles
router.get('/with-details', pagoFacturaController.getAllWithDetails.bind(pagoFacturaController));

// Obtener un pago específico con detalles
router.get('/:id/with-details', pagoFacturaController.getByIdWithDetails.bind(pagoFacturaController));

// Buscar pagos por factura
router.get('/factura/:facturaId', pagoFacturaController.getByFacturaId.bind(pagoFacturaController));

// Marcar como pagada
router.patch('/:id/pagar', pagoFacturaController.marcarComoPagada.bind(pagoFacturaController));

// Marcar como vencida
router.patch('/:id/vencer', pagoFacturaController.marcarComoVencida.bind(pagoFacturaController));

module.exports = router;