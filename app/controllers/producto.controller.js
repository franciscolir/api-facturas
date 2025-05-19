const BaseController = require('./base.controller');
const productoService = require('../services/producto.service');

class ProductoController extends BaseController {
    constructor() {
        super(productoService);
    }

    // Métodos específicos para Producto
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