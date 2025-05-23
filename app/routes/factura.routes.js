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
router.get('/', facturaController.getAll);

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
router.get('/:id', facturaController.getById);

/**
 * @openapi
 * /api/facturas:
 *   post:
 *     summary: Crear una nueva factura
 *     description: Crea una nueva factura en el sistema con los datos proporcionados
 *     tags:
 *       - Facturas
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', facturaController.create);

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
router.put('/:id', facturaController.update);

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
router.delete('/:id', facturaController.delete);

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
router.get('/with-details', facturaController.getAllWithDetails);

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
router.get('/cliente/:clienteId', facturaController.getByClienteId);

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
router.get('/vendedor/:vendedorId', facturaController.getByVendedorId);

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
router.get('/fecha/:fecha', facturaController.getByFecha);

module.exports = router; 