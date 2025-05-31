/**
 * Rutas para la gestión de clientes
 * Define los endpoints para operaciones CRUD y funcionalidades específicas
 * 
 * Características principales:
 * - Operaciones CRUD básicas (GET, POST, PUT, DELETE)
 * - Búsqueda por RUT
 * - Documentación OpenAPI/Swagger
 * - Manejo de respuestas HTTP estandarizadas
 * 
 * @module cliente.routes
 */
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');

// ==========================================
// Rutas CRUD Base
// ==========================================

/**
 * @openapi
 * /api/clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     description: Retorna una lista de todos los clientes registrados en el sistema
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/', clienteController.getAll.bind(clienteController));

/**
 * @openapi
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     description: Retorna los detalles de un cliente específico basado en su ID
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', clienteController.getByPk.bind(clienteController));

/**
 * @openapi
 * /api/clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Crea un nuevo cliente en el sistema con los datos proporcionados
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
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
 *         description: Datos inválidos o RUT ya existe
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/', clienteController.create.bind(clienteController));
/**
 * @openapi
 * /api/clientes/bulk:
 *   post:
 *     summary: Crear múltiples clientes
 *     description: Permite crear varios clientes en una sola solicitud.
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Cliente'
 *           example:
 *             - rut: "12345678-9"
 *               nombre: "Juan Pérez"
 *               email: "juan@correo.com"
 *               telefono: "123456789"
 *               direccion: "Calle Falsa 123"
 *               activo: true
 *             - rut: "98765432-1"
 *               nombre: "Ana López"
 *               email: "ana@correo.com"
 *               telefono: "987654321"
 *               direccion: "Avenida Siempre Viva 742"
 *               activo: true
 *     responses:
 *       201:
 *         description: Clientes creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Datos inválidos o error de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/bulk', clienteController.createBulk.bind(clienteController));

/**
 * @openapi
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     description: Actualiza los datos de un cliente existente
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a actualizar
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
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', clienteController.update.bind(clienteController));

/**
 * @openapi
 * /api/clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     description: Elimina un cliente del sistema
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar
 *     responses:
 *       204:
 *         description: Cliente eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', clienteController.delete.bind(clienteController));

// ==========================================
// Rutas Específicas
// ==========================================

/**
 * @openapi
 * /api/clientes/rut/{rut}:
 *   get:
 *     summary: Obtener cliente por RUT
 *     description: Retorna el cliente con un RUT específico
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rut
 *         required: true
 *         schema:
 *           type: string
 *         description: RUT único del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/rut/:rut', clienteController.getByRut.bind(clienteController));



module.exports = router; 