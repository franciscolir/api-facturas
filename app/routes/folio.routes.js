/**
 * Rutas para la gestión de folios
 * Define los endpoints para operaciones CRUD y funcionalidades específicas
 * 
 * Características principales:
 * - Operaciones CRUD básicas (GET, POST, PUT, DELETE)
 * - Búsqueda por tipo, factura y número
 * - Obtención del último folio disponible
 * - Documentación OpenAPI/Swagger
 * - Manejo de respuestas HTTP estandarizadas
 * 
 * @module folio.routes
 */
const express = require('express');
const router = express.Router();
const folioController = require('../controllers/folio.controller');

/**
 * @swagger
 * tags:
 *   name: Folios
 *   description: API para la gestión de folios de facturación
 */

// =======================
// Rutas CRUD Básicas
// =======================

/**
 * @openapi
 * /api/folios:
 *   get:
 *     summary: Obtener todos los folios
 *     tags: [Folios]
 *     responses:
 *       200:
 *         description: Lista de folios obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get('/', folioController.getAll.bind(folioController));

/**
 * @openapi
 * /api/folios/{id}:
 *   get:
 *     summary: Obtener folio por ID
 *     tags: [Folios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del folio
 *     responses:
 *       200:
 *         description: Folio encontrado exitosamente
 *       404:
 *         description: Folio no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', folioController.getById.bind(folioController));

/**
 * @openapi
 * /api/folios:
 *   post:
 *     summary: Crear un folio
 *     tags: [Folios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Folio'
 *     responses:
 *       201:
 *         description: Folio creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', folioController.create.bind(folioController));

/**
 * @openapi
 * /api/folios/{id}:
 *   put:
 *     summary: Actualizar un folio por ID
 *     tags: [Folios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del folio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Folio'
 *     responses:
 *       200:
 *         description: Folio actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Folio no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', folioController.update.bind(folioController));

/**
 * @openapi
 * /api/folios/{id}:
 *   delete:
 *     summary: Eliminar un folio por ID
 *     tags: [Folios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del folio
 *     responses:
 *       200:
 *         description: Folio eliminado exitosamente
 *       404:
 *         description: Folio no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', folioController.delete.bind(folioController));

/**
 * @openapi
 * /api/folios/bulk:
 *   post:
 *     summary: Crear múltiples folios
 *     description: Permite crear varios folios en una sola solicitud.
 *     tags:
 *       - Folios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Folio'
 *           example:
 *             - numero: 1001
 *               serie: "A"
 *               tipo: "FACTURA"
 *               estado: "disponible"
 *               activo: true
 *             - numero: 1002
 *               serie: "A"
 *               tipo: "FACTURA"
 *               estado: "disponible"
 *               activo: true
 *     responses:
 *       201:
 *         description: Folios creados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Folio'
 *       400:
 *         description: Datos inválidos o error de validación
 *       500:
 *         description: Error del servidor
 */
router.post('/bulk', folioController.createBulk.bind(folioController));

// =======================
// Rutas Específicas
// =======================

/**
 * @openapi
 * /api/folios/tipo/{tipo}:
 *   get:
 *     summary: Obtiene folios por tipo
 *     tags: [Folios]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de folio (ej. FACTURA, BOLETA)
 *     responses:
 *       200:
 *         description: Lista de folios encontrados
 *       404:
 *         description: No se encontraron folios de este tipo
 *       500:
 *         description: Error del servidor
 */
router.get('/tipo/:tipo', folioController.getByTipo.bind(folioController));

/**
 * @openapi
 * /api/folios/tipo/{tipo}/serie/{serie}:
 *   get:
 *     summary: Obtiene folios por tipo y serie
 *     tags: [Folios]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de folio (ej. FACTURA, BOLETA)
 *       - in: path
 *         name: serie
 *         required: true
 *         schema:
 *           type: string
 *         description: Serie del folio
 *     responses:
 *       200:
 *         description: Lista de folios encontrados
 *       404:
 *         description: No se encontraron folios con este tipo y serie
 *       500:
 *         description: Error del servidor
 */
router.get('/tipo/:tipo/serie/:serie', folioController.getByTipoAndSerie.bind(folioController));

/**
 * @openapi
 * /api/folios/siguiente/{tipo}/{serie}:
 *   get:
 *     summary: Obtiene el siguiente folio disponible
 *     tags: [Folios]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de folio (ej. FACTURA, BOLETA)
 *       - in: path
 *         name: serie
 *         required: true
 *         schema:
 *           type: string
 *         description: Serie del folio
 *     responses:
 *       200:
 *         description: Siguiente folio disponible
 *       404:
 *         description: No hay folios disponibles
 *       500:
 *         description: Error del servidor
 */
router.get('/siguiente/:tipo/:serie', folioController.getNextAvailable.bind(folioController));

/**
 * @openapi
 * /api/folios/{id}/usar:
 *   put:
 *     summary: Marca un folio como usado
 *     tags: [Folios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del folio
 *     responses:
 *       200:
 *         description: Folio marcado como usado
 *       404:
 *         description: Folio no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id/usar', folioController.markAsUsed.bind(folioController));

/**
 * @openapi
 * /api/folios/{id}/anular:
 *   put:
 *     summary: Marca un folio como anulado
 *     tags: [Folios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del folio
 *     responses:
 *       200:
 *         description: Folio marcado como anulado
 *       404:
 *         description: Folio no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id/anular', folioController.markAsAnulado.bind(folioController));

module.exports = router;