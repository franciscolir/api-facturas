const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');

/**
 * @openapi
 * /api/productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
router.get('/', productoController.getAll.bind(productoController));

/**
 * @openapi
 * /api/productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', productoController.getById.bind(productoController));

/**
 * @openapi
 * /api/productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags:
 *       - Productos
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
 *         description: Datos inválidos o producto ya existe
 */
router.post('/', productoController.create.bind(productoController));

/**
 * @openapi
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
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
 *       404:
 *         description: Producto no encontrado
 */
router.put('/:id', productoController.update.bind(productoController));

/**
 * @openapi
 * /api/productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       204:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/:id', productoController.delete.bind(productoController));

/**
 * @openapi
 * /api/productos/codigo/{codigo}:
 *   get:
 *     summary: Buscar producto por código
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */
router.get('/codigo/:codigo', productoController.getByCodigo.bind(productoController));

module.exports = router; 