/**
 * Controlador de Folio
 * Gestiona las operaciones relacionadas con los folios de facturación
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para búsqueda por tipo y serie
 * 
 * Características principales:
 * - Operaciones CRUD heredadas del controlador base
 * - Búsqueda específica por tipo y serie
 * - Manejo de estados de folio (disponible, usado, anulado)
 * - Manejo de errores consistente
 * - Respuestas HTTP estandarizadas
 */
const BaseController = require('./base.controller');
const folioService = require('../services/folio.service');

class FolioController extends BaseController {
    /**
     * Constructor del controlador de folio
     * Inicializa el controlador con el servicio correspondiente
     */
    constructor() {
        super(folioService);
    }

    /**
     * Obtiene folios por tipo
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de folios del tipo especificado
     * 
     * @example
     * GET /api/folios/tipo/FACTURA
     */
    async getByTipo(req, res) {
        try {
            const { tipo } = req.params;
            const folios = await folioService.findByTipo(tipo);
            
            if (!folios || folios.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron folios de este tipo'
                });
            }

            return res.status(200).json(folios);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar folios por tipo',
                error: error.message
            });
        }
    }

    /**
     * Obtiene folios por tipo y serie
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de folios del tipo y serie especificados
     * 
     * @example
     * GET /api/folios/tipo/FACTURA/serie/A
     */
    async getByTipoAndSerie(req, res) {
        try {
            const { tipo, serie } = req.params;
            const folios = await folioService.findByTipoAndSerie(tipo, serie);
            
            if (!folios || folios.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron folios con este tipo y serie'
                });
            }

            return res.status(200).json(folios);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar folios por tipo y serie',
                error: error.message
            });
        }
    }

    /**
     * Obtiene el siguiente folio disponible
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Siguiente folio disponible
     * 
     * @example
     * GET /api/folios/siguiente/FACTURA/A
     */
    async getNextAvailable(req, res) {
        try {
            const { tipo, serie } = req.params;
            const folio = await folioService.findNextAvailable(tipo, serie);
            
            if (!folio) {
                return res.status(404).json({
                    message: 'No hay folios disponibles de este tipo y serie'
                });
            }

            return res.status(200).json(folio);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar siguiente folio disponible',
                error: error.message
            });
        }
    }

    /**
     * Marca un folio como usado
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Folio actualizado
     * 
     * @example
     * PUT /api/folios/1/usar
     */
    async markAsUsed(req, res) {
        try {
            const { id } = req.params;
            const folio = await folioService.markAsUsed(id);
            return res.status(200).json(folio);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al marcar folio como usado',
                error: error.message
            });
        }
    }

    /**
     * Marca un folio como anulado
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Folio actualizado
     * 
     * @example
     * PUT /api/folios/1/anular
     */
    async markAsAnulado(req, res) {
        try {
            const { id } = req.params;
            const folio = await folioService.markAsAnulado(id);
            return res.status(200).json(folio);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al marcar folio como anulado',
                error: error.message
            });
        }
    }

    /**
     * Registra múltiples folios en un solo POST
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de folios creados
     * 
     * @example
     * POST /api/folios/bulk
     * Body: [ { numero, tipo, serie, ... }, ... ]
     */
    async createBulk(req, res) {
        try {
            const folios = req.body;
            if (!Array.isArray(folios)) {
                return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un array de folios' });
            }
            const foliosCreados = await this.service.createMany(folios);
            res.status(201).json(foliosCreados);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new FolioController(); 