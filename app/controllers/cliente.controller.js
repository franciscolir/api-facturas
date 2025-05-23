/**
 * Controlador de Clientes
 * Gestiona las operaciones relacionadas con los clientes
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para búsqueda por RUT
 * 
 * Características principales:
 * - Operaciones CRUD heredadas del controlador base
 * - Búsqueda específica por RUT
 * - Manejo de errores consistente
 * - Respuestas HTTP estandarizadas
 */
const BaseController = require('./base.controller');
const clienteService = require('../services/cliente.service');

class ClienteController extends BaseController {
    /**
     * Constructor del controlador de clientes
     * Inicializa el controlador con el servicio de clientes
     */
    constructor() {
        super(clienteService);
    }

    /**
     * Obtiene un cliente por su RUT
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Cliente encontrado
     * 
     * @example
     * GET /api/clientes/rut/12345678-9
     */
    async getByRut(req, res) {
        try {
            const cliente = await this.service.findByRut(req.params.rut);
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ClienteController(); 