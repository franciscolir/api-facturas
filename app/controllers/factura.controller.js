const BaseController = require('./base.controller');
const facturaService = require('../services/factura.service');

class FacturaController extends BaseController {
    constructor() {
        super(facturaService);
    }

    // Métodos específicos para Factura
    async getAllWithDetails(req, res) {
        try {
            const facturas = await this.service.findAllWithDetails();
            res.json(facturas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByClienteId(req, res) {
        try {
            const facturas = await this.service.findByClienteId(req.params.clienteId);
            res.json(facturas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByVendedorId(req, res) {
        try {
            const facturas = await this.service.findByVendedorId(req.params.vendedorId);
            res.json(facturas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

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