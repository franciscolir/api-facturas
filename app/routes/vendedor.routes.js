/**
 * Rutas para la gestión de vendedores
 * Define los endpoints para operaciones CRUD y funcionalidades específicas
 * 
 * Características principales:
 * - Operaciones CRUD básicas (GET, POST, PUT, DELETE)
 * - Búsqueda por código y RUT
 * - Documentación OpenAPI/Swagger
 * - Manejo de respuestas HTTP estandarizadas
 * 
 * @module vendedor.routes
 */
const express = require('express');
const router = express.Router();
const vendedorController = require('../controllers/vendedor.controller');

// ==========================================
// Rutas CRUD Base
// ==========================================

/**
 * @openapi
 * /api/vendedores:
 *   get:
 *     summary: Obtener todos los vendedores
 *     description: Retorna una lista de todos los vendedores registrados en el sistema
 *     tags:
 *       - Vendedores
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendedores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vendedor'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/', vendedorController.getAll.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores/{id}:
 *   get:
 *     summary: Obtener un vendedor por ID
 *     description: Retorna los detalles de un vendedor específico basado en su ID
 *     tags:
 *       - Vendedores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del vendedor
 *     responses:
 *       200:
 *         description: Vendedor encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendedor'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Vendedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', vendedorController.getById.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores:
 *   post:
 *     summary: Crear un nuevo vendedor
 *     description: Crea un nuevo vendedor en el sistema con los datos proporcionados
 *     tags:
 *       - Vendedores
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendedor'
 *     responses:
 *       201:
 *         description: Vendedor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendedor'
 *       400:
 *         description: Datos inválidos o RUT ya existe
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', vendedorController.create.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores/{id}:
 *   put:
 *     summary: Actualizar un vendedor
 *     description: Actualiza los datos de un vendedor existente
 *     tags:
 *       - Vendedores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vendedor'
 *     responses:
 *       200:
 *         description: Vendedor actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendedor'
 *       400:
 *         description: Datos inválidos o RUT ya existe
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Vendedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', vendedorController.update.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores/{id}:
 *   delete:
 *     summary: Eliminar un vendedor
 *     description: Elimina un vendedor del sistema
 *     tags:
 *       - Vendedores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor a eliminar
 *     responses:
 *       204:
 *         description: Vendedor eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Vendedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', vendedorController.delete.bind(vendedorController));

// ==========================================
// Rutas Específicas
// ==========================================

/**
 * @openapi
 * /api/vendedores/codigo/{codigo}:
 *   get:
 *     summary: Obtener vendedor por código
 *     description: Retorna el vendedor con un código específico
 *     tags:
 *       - Vendedores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del vendedor
 *     responses:
 *       200:
 *         description: Vendedor encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendedor'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Vendedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/codigo/:codigo', vendedorController.getByCode.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores/rut/{rut}:
 *   get:
 *     summary: Obtener vendedor por RUT
 *     description: Retorna el vendedor con un RUT específico
 *     tags:
 *       - Vendedores
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rut
 *         required: true
 *         schema:
 *           type: string
 *         description: RUT único del vendedor
 *     responses:
 *       200:
 *         description: Vendedor encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendedor'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Vendedor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/rut/:rut', vendedorController.getByRut.bind(vendedorController));

router.post('/bulk', vendedorController.createBulk.bind(vendedorController));

module.exports = router; 