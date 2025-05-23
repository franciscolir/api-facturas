const express = require('express');
const router = express.Router();
const detalleFacturaController = require('../controllers/detalle-factura.controller');

/**
 * @openapi
 * /api/detalle-factura:
 *   get:
 *     summary: Obtener todos los detalles de factura
 *     tags:
 *       - Detalles de Factura
 *     responses:
 *       200:
 *         description: Lista de detalles de factura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleFactura'
 */
router.get('/', detalleFacturaController.getAll.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalle-factura/{id}:
 *   get:
 *     summary: Obtener un detalle de factura por ID
 *     tags:
 *       - Detalles de Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de factura
 *     responses:
 *       200:
 *         description: Detalle de factura encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleFactura'
 *       404:
 *         description: Detalle de factura no encontrado
 */
router.get('/:id', detalleFacturaController.getById.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalle-factura:
 *   post:
 *     summary: Crear un nuevo detalle de factura
 *     tags:
 *       - Detalles de Factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleFactura'
 *     responses:
 *       201:
 *         description: Detalle de factura creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleFactura'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', detalleFacturaController.create.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalle-factura/{id}:
 *   put:
 *     summary: Actualizar un detalle de factura
 *     tags:
 *       - Detalles de Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetalleFactura'
 *     responses:
 *       200:
 *         description: Detalle de factura actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleFactura'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Detalle de factura no encontrado
 */
router.put('/:id', detalleFacturaController.update.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalle-factura/{id}:
 *   delete:
 *     summary: Eliminar un detalle de factura
 *     tags:
 *       - Detalles de Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de factura
 *     responses:
 *       204:
 *         description: Detalle de factura eliminado exitosamente
 *       404:
 *         description: Detalle de factura no encontrado
 */
router.delete('/:id', detalleFacturaController.delete.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalle-factura/factura/{facturaId}:
 *   get:
 *     summary: Obtener detalles de factura por ID de factura
 *     tags:
 *       - Detalles de Factura
 *     parameters:
 *       - in: path
 *         name: facturaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Lista de detalles de la factura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleFactura'
 *       404:
 *         description: Factura no encontrada
 */
router.get('/factura/:facturaId', detalleFacturaController.getByFacturaId.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalle-factura/bulk:
 *   post:
 *     summary: Crear múltiples detalles de factura
 *     tags:
 *       - Detalles de Factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/DetalleFactura'
 *     responses:
 *       201:
 *         description: Detalles de factura creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleFactura'
 *       400:
 *         description: Datos inválidos
 */
router.post('/bulk', detalleFacturaController.createBulk.bind(detalleFacturaController));

module.exports = router; 