const BaseController = require('./base.controller');
const detalleFacturaService = require('../services/detalle-factura.service');

class DetalleFacturaController extends BaseController {
    constructor() {
        super(detalleFacturaService);
    }

    // Métodos específicos para DetalleFactura
    async getByFacturaId(req, res) {
        try {
            const detalles = await this.service.findByFacturaId(req.params.facturaId);
            res.json(detalles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByProductoId(req, res) {
        try {
            const detalles = await this.service.findByProductoId(req.params.productoId);
            res.json(detalles);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createMany(req, res) {
        try {
            const detalles = await this.service.createMany(req.body);
            res.status(201).json(detalles);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new DetalleFacturaController(); 