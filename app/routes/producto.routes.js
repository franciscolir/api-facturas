/**
 * Rutas para la gestión de productos
 * Define los endpoints para operaciones CRUD y funcionalidades específicas
 * 
 * Características principales:
 * - Operaciones CRUD básicas (GET, POST, PUT, DELETE)
 * - Búsqueda por código
 * - Documentación OpenAPI/Swagger
 * - Manejo de respuestas HTTP estandarizadas
 * 
 * @module producto.routes
 */
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

// ==========================================
// Rutas CRUD Base
// ==========================================

/**
 * @openapi
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de todos los productos registrados en el sistema
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/', productoController.getAll.bind(productoController));

/**
 * @openapi
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Retorna los detalles de un producto específico basado en su ID
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del producto
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', productoController.getByPk.bind(productoController));

/**
 * @openapi
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Crea un nuevo producto en el sistema con los datos proporcionados
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Datos inválidos o código ya existe
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', productoController.create.bind(productoController));

/**
 * @openapi
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Actualiza los datos de un producto existente
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Datos inválidos o código ya existe
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', productoController.update.bind(productoController));

/**
 * @openapi
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto del sistema
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       204:
 *         description: Producto eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', productoController.delete.bind(productoController));

// ==========================================
// Rutas Específicas
// ==========================================

/**
 * @openapi
 * /api/productos/codigo/{codigo}:
 *   get:
 *     summary: Obtener producto por código
 *     description: Retorna el producto con un código específico
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código único del producto
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/codigo/:codigo', productoController.getByCodigo.bind(productoController));
/**
 * @openapi
 * /api/productos/bulk:
 *   post:
 *     summary: Crear múltiples productos
 *     description: Permite crear varios productos en una sola solicitud.
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Producto'
 *           example:
 *             - codigo: "PROD001"
 *               nombre: "Producto 1"
 *               descripcion: "Descripción del producto 1"
 *               precio_unitario: 100.00
 *               stock: 50
 *               activo: true
 *             - codigo: "PROD002"
 *               nombre: "Producto 2"
 *               descripcion: "Descripción del producto 2"
 *               precio_unitario: 200.00
 *               stock: 30
 *               activo: true
 *     responses:
 *       201:
 *         description: Productos creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 *       400:
 *         description: Datos inválidos o error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/bulk', productoController.createBulk.bind(productoController));

module.exports = router; 