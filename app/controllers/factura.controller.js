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
     * Crea una nueva factura con sus detalles y calcula los totales automáticamente
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Factura creada con detalles y totales
     * 
     * @example
     * POST /api/facturas
     * Body: { cabecera y detalles }
     */
    async create(req, res) {
        try {
            const factura = await this.service.createWithDetalles(req.body);
            res.status(201).json(factura);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Crea múltiples facturas con sus detalles en un solo POST
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de facturas creadas
     * 
     * @example
     * POST /api/facturas/bulk
     * Body: [ { cabecera y detalles }, ... ]
     */
    async createBulk(req, res) {
        try {
            const facturas = req.body;
            if (!Array.isArray(facturas)) {
                return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un array de facturas' });
            }
            const facturasCreadas = [];
            for (const data of facturas) {
                const factura = await this.service.createWithDetalles(data);
                facturasCreadas.push(factura);
            }
            res.status(201).json(facturasCreadas);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
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

    /**
     * Obtiene una factura específica con todos sus detalles
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Factura con sus detalles
     * 
     * @example
     * GET /api/facturas/123/with-details
     */
    async getByIdWithDetails(req, res) {
        try {
            const factura = await this.service.findByIdWithDetails(req.params.id);
            if (factura) {
                res.json(factura);
            } else {
                res.status(404).json({ message: 'Factura no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new FacturaController(); 