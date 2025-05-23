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

/**
 * @swagger
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
router.get('/tipo/:tipo', folioController.getByTipo);

/**
 * @swagger
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
router.get('/tipo/:tipo/serie/:serie', folioController.getByTipoAndSerie);

/**
 * @swagger
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
router.get('/siguiente/:tipo/:serie', folioController.getNextAvailable);

/**
 * @swagger
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
router.put('/:id/usar', folioController.markAsUsed);

/**
 * @swagger
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
router.put('/:id/anular', folioController.markAsAnulado);

// Rutas CRUD básicas
router.get('/', folioController.getAll);
router.get('/:id', folioController.getById);
router.post('/', folioController.create);
router.put('/:id', folioController.update);
router.delete('/:id', folioController.delete);

module.exports = router; 