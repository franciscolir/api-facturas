/**
 * Rutas para la gestión de condiciones de pago
 * Define los endpoints para operaciones CRUD y funcionalidades específicas
 * 
 * Características principales:
 * - Operaciones CRUD básicas (GET, POST, PUT, DELETE)
 * - Búsqueda por código, plazo y descripción
 * - Documentación OpenAPI/Swagger
 * - Manejo de respuestas HTTP estandarizadas
 * 
 * @module condicion-pago.routes
 */
const express = require('express');
const router = express.Router();
const condicionPagoController = require('../controllers/condicion-pago.controller');

// ==========================================
// Rutas CRUD Base
// ==========================================

/**
 * @openapi
 * /api/condiciones-pago:
 *   get:
 *     summary: Obtener todas las condiciones de pago
 *     description: Retorna una lista de todas las condiciones de pago registradas en el sistema
 *     tags:
 *       - Condiciones de Pago
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de condiciones de pago obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CondicionPago'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/', condicionPagoController.getAll);

/**
 * @openapi
 * /api/condiciones-pago/{id}:
 *   get:
 *     summary: Obtener una condición de pago por ID
 *     description: Retorna los detalles de una condición de pago específica basada en su ID
 *     tags:
 *       - Condiciones de Pago
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único de la condición de pago
 *     responses:
 *       200:
 *         description: Condición de pago encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CondicionPago'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Condición de pago no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', condicionPagoController.getById);

/**
 * @openapi
 * /api/condiciones-pago:
 *   post:
 *     summary: Crear una nueva condición de pago
 *     description: Crea una nueva condición de pago en el sistema con los datos proporcionados
 *     tags:
 *       - Condiciones de Pago
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CondicionPago'
 *     responses:
 *       201:
 *         description: Condición de pago creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CondicionPago'
 *       400:
 *         description: Datos inválidos o código ya existe
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', condicionPagoController.create);

/**
 * @openapi
 * /api/condiciones-pago/{id}:
 *   put:
 *     summary: Actualizar una condición de pago
 *     description: Actualiza los datos de una condición de pago existente
 *     tags:
 *       - Condiciones de Pago
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la condición de pago a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CondicionPago'
 *     responses:
 *       200:
 *         description: Condición de pago actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CondicionPago'
 *       400:
 *         description: Datos inválidos o código ya existe
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Condición de pago no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', condicionPagoController.update);

/**
 * @openapi
 * /api/condiciones-pago/{id}:
 *   delete:
 *     summary: Eliminar una condición de pago
 *     description: Elimina una condición de pago del sistema
 *     tags:
 *       - Condiciones de Pago
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la condición de pago a eliminar
 *     responses:
 *       204:
 *         description: Condición de pago eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Condición de pago no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', condicionPagoController.delete);

// ==========================================
// Rutas Específicas
// ==========================================

/**
 * @openapi
 * /api/condiciones-pago/codigo/{codigo}:
 *   get:
 *     summary: Obtener condición de pago por código
 *     description: Retorna la condición de pago con un código específico
 *     tags:
 *       - Condiciones de Pago
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único de la condición de pago
 *     responses:
 *       200:
 *         description: Condición de pago encontrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CondicionPago'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Condición de pago no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/codigo/:codigo', condicionPagoController.getByCodigo);

/**
 * @openapi
 * /api/condiciones-pago/plazo/{plazo}:
 *   get:
 *     summary: Obtener condiciones de pago por plazo
 *     description: Retorna todas las condiciones de pago con un plazo específico
 *     tags:
 *       - Condiciones de Pago
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: plazo
 *         required: true
 *         schema:
 *           type: integer
 *         description: Plazo en días de la condición de pago
 *     responses:
 *       200:
 *         description: Lista de condiciones de pago obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CondicionPago'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron condiciones de pago con el plazo especificado
 *       500:
 *         description: Error del servidor
 */
router.get('/plazo/:plazo', condicionPagoController.getByPlazo);

/**
 * @openapi
 * /api/condiciones-pago/descripcion/{descripcion}:
 *   get:
 *     summary: Obtener condiciones de pago por descripción
 *     description: Retorna todas las condiciones de pago que coincidan con la descripción proporcionada
 *     tags:
 *       - Condiciones de Pago
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: descripcion
 *         required: true
 *         schema:
 *           type: string
 *         description: Descripción o parte de la descripción de la condición de pago
 *     responses:
 *       200:
 *         description: Lista de condiciones de pago obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CondicionPago'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: No se encontraron condiciones de pago con la descripción especificada
 *       500:
 *         description: Error del servidor
 */
router.get('/descripcion/:descripcion', condicionPagoController.getByDescripcion);

module.exports = router; 