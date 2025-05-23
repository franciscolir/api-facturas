/**
 * Controlador de Detalles de Factura
 * Gestiona las operaciones relacionadas con los detalles de cada factura
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para búsquedas y creación masiva
 * 
 * Características principales:
 * - Operaciones CRUD heredadas del controlador base
 * - Búsqueda de detalles por factura y producto
 * - Creación masiva de detalles
 * - Manejo de errores consistente
 * - Respuestas HTTP estandarizadas
 */
const BaseController = require('./base.controller');
const detalleFacturaService = require('../services/detalle-factura.service');

class DetalleFacturaController extends BaseController {
    /**
     * Constructor del controlador de detalles de factura
     * Inicializa el controlador con el servicio correspondiente
     */
    constructor() {
        super(detalleFacturaService);
    }

    /**
     * Obtiene los detalles de una factura específica
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de detalles de la factura
     * 
     * @example
     * GET /api/detalles-factura/factura/123
     */
    async getByFacturaId(req, res) {
        try {
            const { facturaId } = req.params;
            const detalles = await detalleFacturaService.findByFacturaId(facturaId);
            
            if (!detalles || detalles.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron detalles para esta factura'
                });
            }

            return res.status(200).json(detalles);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar detalles de factura',
                error: error.message
            });
        }
    }

    /**
     * Obtiene los detalles de factura asociados a un producto específico
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de detalles para el producto
     * 
     * @example
     * GET /api/detalles-factura/producto/456
     */
    async getByProductoId(req, res) {
        try {
            const { productoId } = req.params;
            const detalles = await this.service.findByProductoId(productoId);
            
            if (!detalles || detalles.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron detalles para este producto'
                });
            }

            return res.status(200).json(detalles);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar detalles de factura',
                error: error.message
            });
        }
    }

    /**
     * Crea múltiples detalles de factura en una sola operación
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de detalles creados
     * 
     * @example
     * POST /api/detalles-factura/bulk
     * Body: [ { factura_id, producto_id, cantidad, precio_unitario }, ... ]
     */
    async createBulk(req, res) {
        try {
            const detalles = req.body;
            
            if (!Array.isArray(detalles)) {
                return res.status(400).json({
                    message: 'El cuerpo de la solicitud debe ser un array de detalles'
                });
            }

            const detallesCreados = await detalleFacturaService.createBulk(detalles);
            return res.status(201).json(detallesCreados);
        } catch (error) {
            if (error.message.includes('campos requeridos')) {
                return res.status(400).json({
                    message: error.message
                });
            }
            return res.status(500).json({
                message: 'Error al crear detalles de factura',
                error: error.message
            });
        }
    }
}

module.exports = new DetalleFacturaController(); 