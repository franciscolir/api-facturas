/**
 * Rutas para la gestión de facturas
 * Define los endpoints para operaciones CRUD y funcionalidades específicas
 * 
 * Características principales:
 * - Operaciones CRUD básicas (GET, POST, PUT, DELETE)
 * - Búsqueda por cliente, vendedor y fecha
 * - Obtención de facturas con detalles
 * - Documentación OpenAPI/Swagger
 * - Manejo de respuestas HTTP estandarizadas
 * 
 * @module factura.routes
 */
const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura.controller');

// ==========================================
// Rutas CRUD Base
// ==========================================

/**
 * @openapi
 * /api/facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     description: Retorna una lista de todas las facturas registradas en el sistema
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de facturas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/', facturaController.getAll.bind(facturaController));

/**
 * @openapi
 * /api/facturas/{id}:
 *   get:
 *     summary: Obtener una factura por ID
 *     description: Retorna los detalles de una factura específica basada en su ID
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', facturaController.getById.bind(facturaController));

/**
 * @swagger
 * /api/facturas:
 *   post:
 *     tags:
 *       - Facturas
 *     summary: Crear una factura con sus detalles
 *     description: Crea una sola factura con detalles asociados y recalcula automáticamente los totales (subtotal, IVA, total).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente_id:
 *                 type: integer
 *                 example: 1
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-26"
 *               detalles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:                    
 *                     producto_id:
 *                       type: integer
 *                       description: ID del producto relacionado con el detalle
 *                       example: 42
 *                     descripcion:
 *                       type: string
 *                       description: Descripción del producto o servicio facturado
 *                       example: "Servicio de consultoría"
 *                     cantidad:
 *                       type: integer
 *                       description: Cantidad de unidades del producto (entero positivo)
 *                       example: 3
 *                     precio_unitario:
 *                       type: number
 *                       format: decimal
 *                       description: Precio por unidad del producto al momento de la factura
 *                       example: 150.00
 *                     subtotal:
 *                       type: number
 *                       format: decimal
 *                       description: Subtotal calculado como cantidad * precio_unitario
 *                       example: 450.00
 *     responses:
 *       201:
 *         description: Factura creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Error de validación o datos incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Datos inválidos para la creación de factura"
 */

router.post('/', facturaController.create.bind(facturaController));
/**
 * @swagger
 * /api/facturas/bulk:
 *   post:
 *     tags:
 *       - Facturas
 *     summary: Crear múltiples facturas con sus detalles
 *     description: Crea varias facturas incluyendo sus detalles y recalcula automáticamente los totales (subtotal, IVA, total) por cada una.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 cliente_id:
 *                   type: integer
 *                   example: 1
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-05-26"
 *                 detalles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       descripcion:
 *                         type: string
 *                         example: "Producto A"
 *                       cantidad:
 *                         type: number
 *                         example: 2
 *                       precio_unitario:
 *                         type: number
 *                         example: 100.00
 *     responses:
 *       201:
 *         description: Facturas creadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Error de validación o estructura de datos incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El cuerpo de la solicitud debe ser un array de facturas
 */


router.post('/bulk', facturaController.createBulk.bind(facturaController));
/**
 * @openapi
 * /api/facturas/{id}:
 *   put:
 *     summary: Actualizar una factura
 *     description: Actualiza los datos de una factura existente
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a actualizar
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
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', facturaController.update.bind(facturaController));

/**
 * @openapi
 * /api/facturas/{id}:
 *   delete:
 *     summary: Eliminar una factura
 *     description: Elimina una factura del sistema
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura a eliminar
 *     responses:
 *       204:
 *         description: Factura eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', facturaController.delete.bind(facturaController));

// ==========================================
// Rutas Específicas
// ==========================================

/**
 * @openapi
 * /api/facturas/with-details:
 *   get:
 *     summary: Obtener todas las facturas con sus detalles
 *     description: Retorna una lista de todas las facturas incluyendo sus detalles
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de facturas con detalles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FacturaWithDetails'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/with-details', facturaController.getAllWithDetails.bind(facturaController));

/**
 * @openapi
 * /api/facturas/{id}/with-details:
 *   get:
 *     summary: Obtener una factura específica con sus detalles
 *     description: Retorna los detalles de una factura específica basada en su ID
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaWithDetails'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id/with-details', facturaController.getByIdWithDetails.bind(facturaController));

/**
 * @openapi
 * /api/facturas/cliente/{clienteId}:
 *   get:
 *     summary: Obtener facturas por cliente
 *     description: Retorna todas las facturas asociadas a un cliente específico
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Lista de facturas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron facturas para el cliente especificado
 *       500:
 *         description: Error del servidor
 */
router.get('/cliente/:clienteId', facturaController.getByClienteId.bind(facturaController));

/**
 * @openapi
 * /api/facturas/vendedor/{vendedorId}:
 *   get:
 *     summary: Obtener facturas por vendedor
 *     description: Retorna todas las facturas asociadas a un vendedor específico
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendedorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor
 *     responses:
 *       200:
 *         description: Lista de facturas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron facturas para el vendedor especificado
 *       500:
 *         description: Error del servidor
 */
router.get('/vendedor/:vendedorId', facturaController.getByVendedorId.bind(facturaController));

/**
 * @openapi
 * /api/facturas/fecha/{fecha}:
 *   get:
 *     summary: Obtener facturas por fecha
 *     description: Retorna todas las facturas emitidas en una fecha específica
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fecha
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de emisión de las facturas (formato YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de facturas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Formato de fecha inválido
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron facturas para la fecha especificada
 *       500:
 *         description: Error del servidor
 */
router.get('/fecha/:fecha', facturaController.getByFecha.bind(facturaController));

/**
 * @openapi
 * /api/facturas/borrador:
 *   get:
 *     summary: Obtener todas las facturas en estado borrador
 *     description: Retorna una lista de todas las facturas que están en estado borrador.
 *     tags:
 *       - Facturas
 *     responses:
 *       200:
 *         description: Lista de facturas en estado borrador obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 */
router.get('/borrador', facturaController.getBorrador.bind(facturaController));

/**
 * @openapi
 * /api/facturas/asignar-folios-borrador:
 *   patch:
 *     summary: Asignar folios a todas las facturas en estado borrador
 *     description: Asigna folios disponibles a todas las facturas en estado borrador y las cambia a estado emitida.
 *     tags:
 *       - Facturas
 *     responses:
 *       200:
 *         description: Facturas actualizadas con folios asignados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       400:
 *         description: Error al asignar folios
 */
router.patch('/asignar-folios-borrador', facturaController.asignarFoliosABorradores.bind(facturaController));
module.exports = router; 