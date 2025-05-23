const BaseController = require('./base.controller');
const detalleFacturaService = require('../services/detalle-factura.service');

class DetalleFacturaController extends BaseController {
    constructor() {
        super(detalleFacturaService);
    }

    // Métodos específicos para DetalleFactura
    async getByFacturaId(req, res) {
        try {
            const { facturaId } = req.params;
            const detalles = await detalleFacturaService.findByFacturaId(facturaId);
            
            if (!detalles || detalles.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron detalles para esta factura'
                });
            }

            return res.status(200).json(detalles);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar detalles de factura',
                error: error.message
            });
        }
    }

    async getByProductoId(req, res) {
        try {
            const { productoId } = req.params;
            const detalles = await this.service.findByProductoId(productoId);
            
            if (!detalles || detalles.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron detalles para este producto'
                });
            }

            return res.status(200).json(detalles);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar detalles de factura',
                error: error.message
            });
        }
    }

    async createBulk(req, res) {
        try {
            const detalles = req.body;
            
            if (!Array.isArray(detalles)) {
                return res.status(400).json({
                    message: 'El cuerpo de la solicitud debe ser un array de detalles'
                });
            }

            const detallesCreados = await detalleFacturaService.createBulk(detalles);
            return res.status(201).json(detallesCreados);
        } catch (error) {
            if (error.message.includes('campos requeridos')) {
                return res.status(400).json({
                    message: error.message
                });
            }
            return res.status(500).json({
                message: 'Error al crear detalles de factura',
                error: error.message
            });
        }
    }
}

module.exports = new DetalleFacturaController(); 