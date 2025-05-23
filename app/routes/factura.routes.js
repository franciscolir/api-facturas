const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura.controller');

// Rutas base CRUD

/**
 * @openapi
 * /api/facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags:
 *       - Facturas
 *     responses:
 *       200:
 *         description: Lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 */
router.get('/', facturaController.getAll.bind(facturaController));

/**
 * @openapi
 * /api/facturas/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: Factura no encontrada
 */
router.get('/:id', facturaController.getById.bind(facturaController));

/**
 * @openapi
 * /api/facturas:
 *   post:
 *     summary: Crear una nueva factura
 *     tags:
 *       - Facturas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', facturaController.create.bind(facturaController));

/**
 * @openapi
 * /api/facturas/{id}:
 *   put:
 *     summary: Actualizar una factura
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Factura'
 *     responses:
 *       200:
 *         description: Factura actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Factura no encontrada
 */
router.put('/:id', facturaController.update.bind(facturaController));

/**
 * @openapi
 * /api/facturas/{id}:
 *   delete:
 *     summary: Eliminar una factura
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       204:
 *         description: Factura eliminada exitosamente
 *       404:
 *         description: Factura no encontrada
 */
router.delete('/:id', facturaController.delete.bind(facturaController));

// Rutas específicas

/**
 * @openapi
 * /api/facturas/details/all:
 *   get:
 *     summary: Obtener todas las facturas con sus detalles
 *     tags:
 *       - Facturas
 *     responses:
 *       200:
 *         description: Lista de facturas con detalles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Factura'
 *                   - type: object
 *                     properties:
 *                       detalles:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/DetalleFactura'
 *                       cliente:
 *                         $ref: '#/components/schemas/Cliente'
 */
router.get('/details/all', facturaController.getAllWithDetails.bind(facturaController));

/**
 * @openapi
 * /api/facturas/cliente/{clienteId}:
 *   get:
 *     summary: Obtener facturas por ID de cliente
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de facturas del cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/cliente/:clienteId', facturaController.getByClienteId.bind(facturaController));

/**
 * @openapi
 * /api/facturas/vendedor/{vendedorId}:
 *   get:
 *     summary: Obtener facturas por ID de vendedor
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: vendedorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor
 *     responses:
 *       200:
 *         description: Lista de facturas del vendedor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Factura'
 *                   - type: object
 *                     properties:
 *                       detalles:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/DetalleFactura'
 */
router.get('/vendedor/:vendedorId', facturaController.getByVendedorId.bind(facturaController));

/**
 * @openapi
 * /api/facturas/fecha/{fecha}:
 *   get:
 *     summary: Obtener facturas por fecha
 *     tags:
 *       - Facturas
 *     parameters:
 *       - in: path
 *         name: fecha
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de emisión (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de facturas de la fecha
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Factura'
 *                   - type: object
 *                     properties:
 *                       detalles:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/DetalleFactura'
 *                       cliente:
 *                         $ref: '#/components/schemas/Cliente'
 */
router.get('/fecha/:fecha', facturaController.getByFecha.bind(facturaController));

module.exports = router; 