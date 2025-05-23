const express = require('express');
const router = express.Router();
const condicionPagoController = require('../controllers/condicion-pago.controller');

/**
 * @openapi
 * /api/condiciones-pago:
 *   get:
 *     summary: Obtener todas las condiciones de pago
 *     tags:
 *       - Condiciones de Pago
 *     responses:
 *       200:
 *         description: Lista de condiciones de pago
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CondicionPago'
 */
router.get('/', condicionPagoController.getAll.bind(condicionPagoController));

/**
 * @openapi
 * /api/condiciones-pago/{id}:
 *   get:
 *     summary: Obtener una condición de pago por ID
 *     tags:
 *       - Condiciones de Pago
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la condición de pago
 *     responses:
 *       200:
 *         description: Condición de pago encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CondicionPago'
 *       404:
 *         description: Condición de pago no encontrada
 */
router.get('/:id', condicionPagoController.getById.bind(condicionPagoController));

/**
 * @openapi
 * /api/condiciones-pago:
 *   post:
 *     summary: Crear una nueva condición de pago
 *     tags:
 *       - Condiciones de Pago
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
 *         description: Datos inválidos o condición de pago ya existe
 */
router.post('/', condicionPagoController.create.bind(condicionPagoController));

/**
 * @openapi
 * /api/condiciones-pago/{id}:
 *   put:
 *     summary: Actualizar una condición de pago
 *     tags:
 *       - Condiciones de Pago
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la condición de pago
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
 *       404:
 *         description: Condición de pago no encontrada
 */
router.put('/:id', condicionPagoController.update.bind(condicionPagoController));

/**
 * @openapi
 * /api/condiciones-pago/{id}:
 *   delete:
 *     summary: Eliminar una condición de pago
 *     tags:
 *       - Condiciones de Pago
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la condición de pago
 *     responses:
 *       204:
 *         description: Condición de pago eliminada exitosamente
 *       404:
 *         description: Condición de pago no encontrada
 */
router.delete('/:id', condicionPagoController.delete.bind(condicionPagoController));

/**
 * @openapi
 * /api/condiciones-pago/codigo/{codigo}:
 *   get:
 *     summary: Buscar condición de pago por código
 *     tags:
 *       - Condiciones de Pago
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código de la condición de pago
 *     responses:
 *       200:
 *         description: Condición de pago encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CondicionPago'
 *       404:
 *         description: Condición de pago no encontrada
 */
router.get('/codigo/:codigo', condicionPagoController.getByCodigo.bind(condicionPagoController));

/**
 * @openapi
 * /api/condiciones-pago/plazo/{plazo}:
 *   get:
 *     summary: Buscar condiciones por días de vencimiento
 *     tags:
 *       - Condiciones de Pago
 *     parameters:
 *       - in: path
 *         name: plazo
 *         required: true
 *         schema:
 *           type: integer
 *         description: Días de vencimiento
 *     responses:
 *       200:
 *         description: Lista de condiciones de pago encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CondicionPago'
 *       404:
 *         description: No se encontraron condiciones de pago
 */
router.get('/plazo/:plazo', condicionPagoController.getByPlazo.bind(condicionPagoController));

/**
 * @openapi
 * /api/condiciones-pago/descripcion/{descripcion}:
 *   get:
 *     summary: Buscar condiciones por descripción
 *     tags:
 *       - Condiciones de Pago
 *     parameters:
 *       - in: path
 *         name: descripcion
 *         required: true
 *         schema:
 *           type: string
 *         description: Descripción a buscar
 *     responses:
 *       200:
 *         description: Lista de condiciones de pago encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CondicionPago'
 *       404:
 *         description: No se encontraron condiciones de pago
 */
router.get('/descripcion/:descripcion', condicionPagoController.getByDescripcion.bind(condicionPagoController));

module.exports = router; 