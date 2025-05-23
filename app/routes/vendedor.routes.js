const express = require('express');
const router = express.Router();
const vendedorController = require('../controllers/vendedor.controller');

/**
 * @openapi
 * /api/vendedores:
 *   get:
 *     summary: Obtener todos los vendedores
 *     tags:
 *       - Vendedores
 *     responses:
 *       200:
 *         description: Lista de vendedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vendedor'
 */
router.get('/', vendedorController.getAll.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores/{id}:
 *   get:
 *     summary: Obtener un vendedor por ID
 *     tags:
 *       - Vendedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor
 *     responses:
 *       200:
 *         description: Vendedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendedor'
 *       404:
 *         description: Vendedor no encontrado
 */
router.get('/:id', vendedorController.getById.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores:
 *   post:
 *     summary: Crear un nuevo vendedor
 *     tags:
 *       - Vendedores
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
 *         description: Datos inválidos o vendedor ya existe
 */
router.post('/', vendedorController.create.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores/{id}:
 *   put:
 *     summary: Actualizar un vendedor
 *     tags:
 *       - Vendedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor
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
 *       404:
 *         description: Vendedor no encontrado
 */
router.put('/:id', vendedorController.update.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores/{id}:
 *   delete:
 *     summary: Eliminar un vendedor
 *     tags:
 *       - Vendedores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del vendedor
 *     responses:
 *       204:
 *         description: Vendedor eliminado exitosamente
 *       404:
 *         description: Vendedor no encontrado
 */
router.delete('/:id', vendedorController.delete.bind(vendedorController));

/**
 * @openapi
 * /api/vendedores/rut/{rut}:
 *   get:
 *     summary: Buscar vendedor por RUT
 *     tags:
 *       - Vendedores
 *     parameters:
 *       - in: path
 *         name: rut
 *         required: true
 *         schema:
 *           type: string
 *         description: RUT del vendedor
 *     responses:
 *       200:
 *         description: Vendedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendedor'
 *       404:
 *         description: Vendedor no encontrado
 */
router.get('/rut/:rut', vendedorController.getByRut.bind(vendedorController));

module.exports = router; 