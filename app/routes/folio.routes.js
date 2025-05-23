const express = require('express');
const router = express.Router();
const FolioController = require('../controllers/folio.controller');
const folioController = new FolioController();

// ==========================================
// Rutas CRUD Base
// ==========================================

/**
 * @openapi
 * /api/folios:
 *   get:
 *     summary: Obtener todos los folios
 *     tags:
 *       - Folios
 *     responses:
 *       200:
 *         description: Lista de folios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Folio'
 */
router.get('/', folioController.getAll.bind(folioController));

/**
 * @openapi
 * /api/folios/{id}:
 *   get:
 *     summary: Obtener un folio por ID
 *     tags:
 *       - Folios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del folio
 *     responses:
 *       200:
 *         description: Folio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folio'
 *       404:
 *         description: Folio no encontrado
 */
router.get('/:id', folioController.getById.bind(folioController));

/**
 * @openapi
 * /api/folios:
 *   post:
 *     summary: Crear un nuevo folio
 *     tags:
 *       - Folios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Folio'
 *     responses:
 *       201:
 *         description: Folio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folio'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', folioController.create.bind(folioController));

/**
 * @openapi
 * /api/folios/{id}:
 *   put:
 *     summary: Actualizar un folio
 *     tags:
 *       - Folios
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folio'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Folio no encontrado
 */
router.put('/:id', folioController.update.bind(folioController));

/**
 * @openapi
 * /api/folios/{id}:
 *   delete:
 *     summary: Eliminar un folio
 *     tags:
 *       - Folios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del folio
 *     responses:
 *       204:
 *         description: Folio eliminado exitosamente
 *       404:
 *         description: Folio no encontrado
 */
router.delete('/:id', folioController.delete.bind(folioController));

// ==========================================
// Rutas Específicas
// ==========================================

/**
 * @openapi
 * /api/folios/tipo/{tipo}:
 *   get:
 *     summary: Obtener folios por tipo
 *     tags:
 *       - Folios
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de folio
 *     responses:
 *       200:
 *         description: Lista de folios del tipo especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Folio'
 *       404:
 *         description: No se encontraron folios del tipo especificado
 */
router.get('/tipo/:tipo', folioController.getByTipo.bind(folioController));

/**
 * @openapi
 * /api/folios/factura/{facturaId}:
 *   get:
 *     summary: Obtener folio por ID de factura
 *     tags:
 *       - Folios
 *     parameters:
 *       - in: path
 *         name: facturaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Folio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folio'
 *       404:
 *         description: Folio no encontrado
 */
router.get('/factura/:facturaId', folioController.getByFacturaId.bind(folioController));

/**
 * @openapi
 * /api/folios/numero/{numero}:
 *   get:
 *     summary: Obtener folio por número
 *     tags:
 *       - Folios
 *     parameters:
 *       - in: path
 *         name: numero
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número del folio
 *     responses:
 *       200:
 *         description: Folio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folio'
 *       404:
 *         description: Folio no encontrado
 */
router.get('/numero/:numero', folioController.getByNumero.bind(folioController));

/**
 * @openapi
 * /api/folios/ultimo/folio:
 *   get:
 *     summary: Obtener el último folio generado
 *     tags:
 *       - Folios
 *     responses:
 *       200:
 *         description: Último folio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Folio'
 *       404:
 *         description: No se encontró ningún folio
 */
router.get('/ultimo/folio', folioController.getLastFolio.bind(folioController));

module.exports = router; 