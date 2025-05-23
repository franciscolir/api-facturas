/**
 * Controlador de Condiciones de Pago
 * Gestiona las operaciones relacionadas con las condiciones de pago
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para búsqueda por código, plazo y descripción
 * 
 * Características principales:
 * - Operaciones CRUD heredadas del controlador base
 * - Búsqueda específica por código, plazo y descripción
 * - Manejo de errores consistente
 * - Respuestas HTTP estandarizadas
 */
const BaseController = require('./base.controller');
const condicionPagoService = require('../services/condicion-pago.service');

class CondicionPagoController extends BaseController {
    /**
     * Constructor del controlador de condiciones de pago
     * Inicializa el controlador con el servicio correspondiente
     */
    constructor() {
        super(condicionPagoService);
    }

    /**
     * Obtiene una condición de pago por su código
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Condición de pago encontrada
     * 
     * @example
     * GET /api/condiciones-pago/codigo/CONTADO
     */
    async getByCodigo(req, res) {
        try {
            const { codigo } = req.params;
            const condicion = await condicionPagoService.findByCodigo(codigo);
            
            if (!condicion) {
                return res.status(404).json({
                    message: 'Condición de pago no encontrada'
                });
            }

            return res.status(200).json(condicion);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar condición de pago por código',
                error: error.message
            });
        }
    }

    /**
     * Obtiene condiciones de pago por plazo
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de condiciones de pago con el plazo indicado
     * 
     * @example
     * GET /api/condiciones-pago/plazo/30
     */
    async getByPlazo(req, res) {
        try {
            const { plazo } = req.params;
            const condiciones = await condicionPagoService.findByPlazo(plazo);
            
            if (!condiciones || condiciones.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron condiciones de pago con ese plazo'
                });
            }

            return res.status(200).json(condiciones);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar condiciones de pago por plazo',
                error: error.message
            });
        }
    }

    /**
     * Obtiene condiciones de pago por descripción
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de condiciones de pago con la descripción indicada
     * 
     * @example
     * GET /api/condiciones-pago/descripcion/Transferencia
     */
    async getByDescripcion(req, res) {
        try {
            const { descripcion } = req.params;
            const condiciones = await condicionPagoService.findByDescripcion(descripcion);
            
            if (!condiciones || condiciones.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron condiciones de pago con esa descripción'
                });
            }

            return res.status(200).json(condiciones);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar condiciones de pago por descripción',
                error: error.message
            });
        }
    }
}

module.exports = new CondicionPagoController(); 