/**
 * Controlador de Clientes
 * Gestiona las operaciones relacionadas con los clientes
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para búsqueda por RUT y registro masivo
 * 
 * Características principales:
 * - Operaciones CRUD heredadas del controlador base
 * - Búsqueda específica por RUT
 * - Registro masivo de clientes
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
     * Obtiene la lista de todos los clientes
     * GET /api/clientes
     */
    getAll = async (req, res) => {
        try {
            const clientes = await this.service.findAll();
            res.json(clientes.map(u => u.toPublicJSON()));
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Obtiene un cliente por su ID
     * GET /api/clientes/:id
     */
    getByPk = async (req, res) => {
        try {
            const item = await this.service.findByPk(req.params.id);
            if (item) {
                res.json(item ? item.toPublicJSON() : {});
            } else {
                res.status(404).json({ message: 'Cliente not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Crea un nuevo cliente
     * POST /api/clientes
     */
    create = async (req, res) => {
        try {
            const item = await this.service.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            // Control detallado de errores y validaciones
            console.error('Error al crear cliente:', error);
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors ? error.errors.map(e => ({
                        message: e.message,
                        path: e.path,
                        value: e.value
                    })) : [],
                    errorMessage: error.message
                });
            }
            res.status(500).json({
                message: 'Error interno al crear cliente',
                errorMessage: error.message,
                stack: error.stack
            });
        }
    }

    /**
     * Actualiza un cliente existente
     * PUT /api/clientes/:id
     */
    update = async (req, res) => {
        try {
            const item = await this.service.update(req.params.id, req.body);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: 'Cliente not found' });
            }
        } catch (error) {
            res.status(400).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Elimina un cliente por su ID
     * DELETE /api/clientes/:id
     */
    delete = async (req, res) => {
        try {
            const success = await this.service.delete(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Cliente not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Obtiene un cliente por su RUT
     * GET /api/clientes/rut/:rut
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Cliente encontrado
     * 
     * @example
     * GET /api/clientes/rut/12345678-9
     */
    getByRut = async (req, res) => {
        try {
            const cliente = await this.service.findByRut(req.params.rut);
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Registra múltiples clientes en un solo POST
     * POST /api/clientes/bulk
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de clientes creados
     * 
     * @example
     * POST /api/clientes/bulk
     * Body: [ { nombre, rut, email, ... }, ... ]
     */
    createBulk = async (req, res) => {
        try {
            const clientes = req.body;
            // Valida que el cuerpo de la solicitud sea un array
            if (!Array.isArray(clientes)) {
                return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un array de clientes' });
            }
            // Llama al servicio para crear múltiples clientes
            const clientesCreados = await this.service.createMany(clientes);
            res.status(201).json(clientesCreados);
        } catch (error) {
            res.status(400).json({ 
                message: error.message,
                error: error
            });
        }
    }
}

module.exports = new ClienteController();