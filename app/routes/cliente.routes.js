const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

// Rutas base CRUD
/**
 * @openapi
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 */
router.get('/', clienteController.getAll.bind(clienteController));

/**
 * @openapi
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/:id', clienteController.getById.bind(clienteController));

/**
 * @openapi
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos inválidos o cliente ya existe
 */
router.post('/', clienteController.create.bind(clienteController));

/**
 * @openapi
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos inválidos o RUT ya existe
 *       404:
 *         description: Cliente no encontrado
 */
router.put('/:id', clienteController.update.bind(clienteController));

/**
 * @openapi
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente
 *     responses:
 *       204:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 */
router.delete('/:id', clienteController.delete.bind(clienteController));

// Rutas específicas
/**
 * @openapi
 * /api/clientes/rut/{rut}:
 *   get:
 *     summary: Buscar cliente por RUT
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: rut
 *         required: true
 *         schema:
 *           type: string
 *         description: RUT del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente no encontrado
 */
router.get('/rut/:rut', clienteController.getByRut.bind(clienteController));

module.exports = router; 