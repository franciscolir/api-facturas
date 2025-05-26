/**
 * Rutas para la gestión de detalles de factura
 * Define los endpoints para operaciones CRUD y funcionalidades específicas
 * 
 * Características principales:
 * - Operaciones CRUD básicas (GET, POST, PUT, DELETE)
 * - Búsqueda por factura y producto
 * - Creación masiva de detalles
 * - Documentación OpenAPI/Swagger
 * - Manejo de respuestas HTTP estandarizadas
 * 
 * @module detalle-factura.routes
 */
const express = require('express');
const router = express.Router();
const detalleFacturaController = require('../controllers/detalle-factura.controller');

// ==========================================
// Rutas CRUD Base
// ==========================================

/**
 * @openapi
 * /api/detalles-factura:
 *   get:
 *     summary: Obtener todos los detalles de factura
 *     description: Retorna una lista de todos los detalles de factura registrados en el sistema
 *     tags:
 *       - Detalles de Factura
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de detalles de factura obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleFactura'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/', detalleFacturaController.getAll.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalles-factura/{id}:
 *   get:
 *     summary: Obtener un detalle de factura por ID
 *     description: Retorna los detalles de un registro específico basado en su ID
 *     tags:
 *       - Detalles de Factura
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del detalle de factura
 *     responses:
 *       200:
 *         description: Detalle de factura encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetalleFactura'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Detalle de factura no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', detalleFacturaController.getById.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalles-factura:
 *   post:
 *     summary: Crear un nuevo detalle de factura
 *     description: Crea un nuevo detalle de factura en el sistema con los datos proporcionados
 *     tags:
 *       - Detalles de Factura
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', detalleFacturaController.create.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalles-factura/{id}:
 *   put:
 *     summary: Actualizar un detalle de factura
 *     description: Actualiza los datos de un detalle de factura existente
 *     tags:
 *       - Detalles de Factura
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de factura a actualizar
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
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Detalle de factura no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', detalleFacturaController.update.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalles-factura/{id}:
 *   delete:
 *     summary: Eliminar un detalle de factura
 *     description: Elimina un detalle de factura del sistema
 *     tags:
 *       - Detalles de Factura
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de factura a eliminar
 *     responses:
 *       204:
 *         description: Detalle de factura eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Detalle de factura no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', detalleFacturaController.delete.bind(detalleFacturaController));

// ==========================================
// Rutas Específicas
// ==========================================

/**
 * @openapi
 * /api/detalles-factura/factura/{facturaId}:
 *   get:
 *     summary: Obtener detalles por factura
 *     description: Retorna todos los detalles asociados a una factura específica
 *     tags:
 *       - Detalles de Factura
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: facturaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Lista de detalles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleFactura'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron detalles para la factura especificada
 *       500:
 *         description: Error del servidor
 */
router.get('/factura/:facturaId', detalleFacturaController.getByFacturaId.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalles-factura/producto/{productoId}:
 *   get:
 *     summary: Obtener detalles por producto
 *     description: Retorna todos los detalles que incluyen un producto específico
 *     tags:
 *       - Detalles de Factura
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Lista de detalles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetalleFactura'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron detalles para el producto especificado
 *       500:
 *         description: Error del servidor
 */
router.get('/producto/:productoId', detalleFacturaController.getByProductoId.bind(detalleFacturaController));

/**
 * @openapi
 * /api/detalles-factura/bulk:
 *   post:
 *     summary: Crear múltiples detalles de factura
 *     description: Crea varios detalles de factura en una sola operación
 *     tags:
 *       - Detalles de Factura
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/bulk', detalleFacturaController.createBulk.bind(detalleFacturaController));

module.exports = router; 