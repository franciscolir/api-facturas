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
     * Obtiene la lista de todos los vendedores
     * GET /api/vendedores
     */
    getAll = async (req, res) => {
        try {
            const items = await this.service.findAll();
            res.json(items);
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Obtiene un vendedor por su ID
     * GET /api/vendedores/:id
     */
    getById = async (req, res) => {
        try {
            const item = await this.service.findById(req.params.id);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Crea un nuevo vendedor
     * POST /api/vendedores
     */
    create = async (req, res) => {
        try {
            const item = await this.service.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(400).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Actualiza un vendedor existente
     * PUT /api/vendedores/:id
     */
    update = async (req, res) => {
        try {
            const item = await this.service.update(req.params.id, req.body);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(400).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Elimina un vendedor por su ID
     * DELETE /api/vendedores/:id
     */
    delete = async (req, res) => {
        try {
            const success = await this.service.delete(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Obtiene un vendedor por su código
     * GET /api/vendedores/codigo/:codigo
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Vendedor encontrado
     * 
     * @example
     * GET /api/vendedores/codigo/V001
     */
    getByCode = async (req, res) => {
        try {
            const vendedor = await this.service.findByCode(req.params.codigo);
            if (vendedor) {
                res.json(vendedor);
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    /**
     * Obtiene un vendedor por su RUT
     * GET /api/vendedores/rut/:rut
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Vendedor encontrado
     * 
     * @example
     * GET /api/vendedores/rut/12345678-9
     */
    getByRut = async (req, res) => {
        try {
            const { rut } = req.params;
            const vendedor = await this.service.findByRut(rut);
            
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

    /**
     * Registra múltiples vendedores en un solo POST
     * POST /api/vendedores/bulk
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de vendedores creados
     * 
     * @example
     * POST /api/vendedores/bulk
     * Body: [ { nombre, email, telefono }, ... ]
     */
    createBulk = async (req, res) => {
        try {
            const vendedores = req.body;
            // Valida que el cuerpo de la solicitud sea un array
            if (!Array.isArray(vendedores)) {
                return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un array de vendedores' });
            }
            // Llama al servicio para crear múltiples vendedores
            const vendedoresCreados = await this.service.createMany(vendedores);
            res.status(201).json(vendedoresCreados);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new VendedorController();/**
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

    getAll = async (req, res) => {
        try {
            const items = await this.service.findAll();
            res.json(items);
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    getById = async (req, res) => {
        try {
            const item = await this.service.findById(req.params.id);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
    }

    create = async (req, res) => {
        try {
            const item = await this.service.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(400).json({ 
                message: error.message,
                error: error
            });
        }
    }

    update = async (req, res) => {
        try {
            const item = await this.service.update(req.params.id, req.body);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(400).json({ 
                message: error.message,
                error: error
            });
        }
    }

    delete = async (req, res) => {
        try {
            const success = await this.service.delete(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
        }
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
    getByCode = async (req, res) => {
        try {
            const vendedor = await this.service.findByCode(req.params.codigo);
            if (vendedor) {
                res.json(vendedor);
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(500).json({ 
                message: error.message,
                error: error
            });
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
    getByRut = async (req, res) => {
        try {
            const { rut } = req.params;
            const vendedor = await this.service.findByRut(rut);
            
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

    /**
     * Registra múltiples vendedores en un solo POST
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de vendedores creados
     * 
     * @example
     * POST /api/vendedores/bulk
     * Body: [ { nombre, email, telefono }, ... ]
     */
    createBulk = async (req, res) => {
        try {
            const vendedores = req.body;
            if (!Array.isArray(vendedores)) {
                return res.status(400).json({ message: 'El cuerpo de la solicitud debe ser un array de vendedores' });
            }
            const vendedoresCreados = await this.service.createMany(vendedores);
            res.status(201).json(vendedoresCreados);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new VendedorController(); 