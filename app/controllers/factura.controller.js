/**
 * Controlador de Facturas
 * Gestiona las operaciones relacionadas con las facturas
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para búsquedas y filtros
 * 
 * Características principales:
 * - Operaciones CRUD heredadas del controlador base
 * - Búsqueda con detalles incluidos
 * - Filtrado por cliente, vendedor y fecha
 * - Manejo de errores consistente
 * - Respuestas HTTP estandarizadas
 */
const BaseController = require('./base.controller');
const facturaService = require('../services/factura.service');

class FacturaController extends BaseController {
    /**
     * Constructor del controlador de facturas
     * Inicializa el controlador con el servicio de facturas
     */
    constructor() {
        super(facturaService);
    }

    /**
     * Obtiene todas las facturas con sus detalles
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de facturas con detalles
     * 
     * @example
     * GET /api/facturas/with-details
     */
    async getAllWithDetails(req, res) {
        try {
            const facturas = await this.service.findAllWithDetails();
            res.json(facturas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Obtiene las facturas de un cliente específico
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de facturas del cliente
     * 
     * @example
     * GET /api/facturas/cliente/123
     */
    async getByClienteId(req, res) {
        try {
            const facturas = await this.service.findByClienteId(req.params.clienteId);
            res.json(facturas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Obtiene las facturas de un vendedor específico
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de facturas del vendedor
     * 
     * @example
     * GET /api/facturas/vendedor/456
     */
    async getByVendedorId(req, res) {
        try {
            const facturas = await this.service.findByVendedorId(req.params.vendedorId);
            res.json(facturas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Obtiene las facturas de una fecha específica
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de facturas de la fecha
     * 
     * @example
     * GET /api/facturas/fecha/2024-03-20
     */
    async getByFecha(req, res) {
        try {
            const facturas = await this.service.findByFecha(req.params.fecha);
            res.json(facturas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new FacturaController(); 