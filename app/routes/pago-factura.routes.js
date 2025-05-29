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

/**
 * @openapi
 * /api/pagos-factura:
 *   get:
 *     summary: Obtener todos los pagos de factura
 *     description: Retorna una lista de todos los pagos de factura registrados en el sistema.
 *     tags:
 *       - Pagos de Factura
 *     responses:
 *       200:
 *         description: Lista de pagos de factura obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PagoFactura'
 */
router.get('/', pagoFacturaController.getAll.bind(pagoFacturaController));

/**
 * @openapi
 * /api/pagos-factura/{id}:
 *   get:
 *     summary: Obtener un pago de factura por ID
 *     description: Retorna los detalles de un pago de factura específico basado en su ID.
 *     tags:
 *       - Pagos de Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del pago de factura
 *     responses:
 *       200:
 *         description: Pago de factura encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PagoFactura'
 *       404:
 *         description: Pago de factura no encontrado
 */
router.get('/:id', pagoFacturaController.getById.bind(pagoFacturaController));

/**
 * @openapi
 * /api/pagos-factura:
 *   post:
 *     summary: Crear un nuevo pago de factura
 *     description: Crea un nuevo pago de factura en el sistema con los datos proporcionados.
 *     tags:
 *       - Pagos de Factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PagoFactura'
 *     responses:
 *       201:
 *         description: Pago de factura creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PagoFactura'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', pagoFacturaController.create.bind(pagoFacturaController));

/**
 * @openapi
 * /api/pagos-factura/{id}:
 *   put:
 *     summary: Actualizar un pago de factura
 *     description: Actualiza los datos de un pago de factura existente.
 *     tags:
 *       - Pagos de Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago de factura a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PagoFactura'
 *     responses:
 *       200:
 *         description: Pago de factura actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PagoFactura'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Pago de factura no encontrado
 */
router.put('/:id', pagoFacturaController.update.bind(pagoFacturaController));

/**
 * @openapi
 * /api/pagos-factura/{id}:
 *   delete:
 *     summary: Eliminar un pago de factura
 *     description: Elimina un pago de factura del sistema.
 *     tags:
 *       - Pagos de Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago de factura a eliminar
 *     responses:
 *       204:
 *         description: Pago de factura eliminado exitosamente
 *       404:
 *         description: Pago de factura no encontrado
 */
router.delete('/:id', pagoFacturaController.delete.bind(pagoFacturaController));

// ==========================================
// Rutas Específicas
// ==========================================


/**
 * @openapi
 * /api/pagos-factura/factura/{facturaId}:
 *   get:
 *     summary: Buscar pagos por ID de factura
 *     description: Retorna todos los pagos asociados a una factura específica.
 *     tags:
 *       - Pagos de Factura
 *     parameters:
 *       - in: path
 *         name: facturaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Lista de pagos de la factura obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PagoFactura'
 *       404:
 *         description: No se encontraron pagos para la factura especificada
 */
router.get('/factura/:facturaId', pagoFacturaController.getByFacturaId.bind(pagoFacturaController));

/**
 * @openapi
 * /api/pagos-factura/{id}/pagada:
 *   patch:
 *     summary: Marcar un pago de factura como pagado
 *     description: Cambia el estado de un pago de factura a "pagada".
 *     tags:
 *       - Pagos de Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago de factura a marcar como pagado
 *     responses:
 *       200:
 *         description: Pago de factura marcado como pagado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PagoFactura'
 *       404:
 *         description: Pago de factura no encontrado
 */
router.patch('/:id/pagada', pagoFacturaController.marcarComoPagada.bind(pagoFacturaController));

/**
 * @openapi
 * /api/pagos-factura/{id}/vencida:
 *   patch:
 *     summary: Marcar un pago de factura como vencido
 *     description: Cambia el estado de un pago de factura a "vencida".
 *     tags:
 *       - Pagos de Factura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago de factura a marcar como vencido
 *     responses:
 *       200:
 *         description: Pago de factura marcado como vencido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PagoFactura'
 *       404:
 *         description: Pago de factura no encontrado
 */
router.patch('/:id/vencida', pagoFacturaController.marcarComoVencida.bind(pagoFacturaController));


/**
 * @openapi
 * /api/pagos-factura/vencidas-hoy:
 *   get:
 *     summary: Obtener lista de facturas vencidas del día de hoy
 *     description: Retorna todos los pagos de factura cuyo vencimiento corresponde a la fecha actual y están en estado "vencida".
 *     tags:
 *       - Pagos de Factura
 *     responses:
 *       200:
 *         description: Lista de pagos de factura vencidos hoy obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PagoFactura'
 */
router.get('/vencidas-hoy', pagoFacturaController.getVencidasHoy.bind(pagoFacturaController));

/**
 * @openapi
 * /api/pagos-factura/cliente/{clienteId}/{estado}:
 *   get:
 *     summary: Consultar pagos de factura por estado y cliente
 *     description: Retorna todos los pagos de factura filtrados por estado (pagada, pendiente, vencida) y por cliente.
 *     tags:
 *       - Pagos de Factura
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *       - in: path
 *         name: estado
 *         required: true
 *         schema:
 *           type: string
 *           enum: [pagada, pendiente, vencida]
 *         description: Estado de la factura a consultar
 *     responses:
 *       200:
 *         description: Lista de pagos de factura por estado y cliente obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PagoFactura'
 *       400:
 *         description: Estado no válido
 */
router.get('/cliente/:clienteId/:estado', pagoFacturaController.getByEstado.bind(pagoFacturaController));

module.exports = router;