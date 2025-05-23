/**
 * Controlador de Vendedores
 * Gestiona las operaciones relacionadas con los vendedores
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para búsqueda por código y RUT
 * 
 * Características principales:
 * - Operaciones CRUD heredadas del controlador base
 * - Búsqueda de vendedores por código y RUT
 * - Manejo de errores consistente
 * - Respuestas HTTP estandarizadas
 */
const BaseController = require('./base.controller');
const vendedorService = require('../services/vendedor.service');

class VendedorController extends BaseController {
    /**
     * Constructor del controlador de vendedores
     * Inicializa el controlador con el servicio correspondiente
     */
    constructor() {
        super(vendedorService);
    }

    /**
     * Obtiene un vendedor por su código
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Vendedor encontrado
     * 
     * @example
     * GET /api/vendedores/codigo/V001
     */
    async getByCode(req, res) {
        try {
            const vendedor = await this.service.findByCode(req.params.codigo);
            if (vendedor) {
                res.json(vendedor);
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Obtiene un vendedor por su RUT
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Vendedor encontrado
     * 
     * @example
     * GET /api/vendedores/rut/12345678-9
     */
    async getByRut(req, res) {
        try {
            const { rut } = req.params;
            const vendedor = await vendedorService.findByRut(rut);
            
            if (!vendedor) {
                return res.status(404).json({
                    message: 'Vendedor no encontrado'
                });
            }

            return res.status(200).json(vendedor);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar vendedor por RUT',
                error: error.message
            });
        }
    }
}

module.exports = new VendedorController(); 