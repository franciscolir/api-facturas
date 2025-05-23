/**
 * Controlador de Productos
 * Gestiona las operaciones relacionadas con los productos
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para búsqueda por código y categoría
 * 
 * Características principales:
 * - Operaciones CRUD heredadas del controlador base
 * - Búsqueda de productos por código y categoría
 * - Manejo de errores consistente
 * - Respuestas HTTP estandarizadas
 */
const BaseController = require('./base.controller');
const productoService = require('../services/producto.service');

class ProductoController extends BaseController {
    /**
     * Constructor del controlador de productos
     * Inicializa el controlador con el servicio correspondiente
     */
    constructor() {
        super(productoService);
    }

    /**
     * Obtiene un producto por su código
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Producto encontrado
     * 
     * @example
     * GET /api/productos/codigo/PROD001
     */
    async getByCodigo(req, res) {
        try {
            const producto = await this.service.findByCodigo(req.params.codigo);
            if (producto) {
                res.json(producto);
            } else {
                res.status(404).json({ message: 'Producto not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Obtiene productos por categoría
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de productos de la categoría
     * 
     * @example
     * GET /api/productos/categoria/ELECTRONICA
     */
    async getByCategoria(req, res) {
        try {
            const productos = await this.service.findByCategoria(req.params.categoria);
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ProductoController(); 