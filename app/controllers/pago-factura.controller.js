/**
 * Controlador de Pagos de Facturas
 * Gestiona las operaciones relacionadas con los pagos de facturas
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para búsquedas y acciones de pago
 */
const BaseController = require('./base.controller');
const pagoFacturaService = require('../services/pago-factura.service');

class PagoFacturaController extends BaseController {
    constructor() {
        super(pagoFacturaService);
    }

    /**
     * Obtiene todos los pagos de factura con sus relaciones
     * GET /api/pagos-factura/with-details
     */
    async getAllWithDetails(req, res) {
        try {
            const pagos = await this.service.findAllWithDetails();
            res.json(pagos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Obtiene un pago de factura específico con sus relaciones
     * GET /api/pagos-factura/:id/with-details
     */
    async getByIdWithDetails(req, res) {
        try {
            const pago = await this.service.findByIdWithDetails(req.params.id);
            if (pago) {
                res.json(pago);
            } else {
                res.status(404).json({ message: 'Pago de factura no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Busca pagos de factura por ID de factura
     * GET /api/pagos-factura/factura/:facturaId
     */
    async getByFacturaId(req, res) {
        try {
            const pagos = await this.service.findByFacturaId(req.params.facturaId);
            res.json(pagos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Marca un pago de factura como pagado
     * PATCH /api/pagos-factura/:id/pagar
     */
    async marcarComoPagada(req, res) {
        try {
            const pago = await this.service.marcarComoPagada(req.params.id);
            if (pago) {
                res.json(pago);
            } else {
                res.status(404).json({ message: 'Pago de factura no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Marca un pago de factura como vencido
     * PATCH /api/pagos-factura/:id/vencer
     */
    async marcarComoVencida(req, res) {
        try {
            const pago = await this.service.marcarComoVencida(req.params.id);
            if (pago) {
                res.json(pago);
            } else {
                res.status(404).json({ message: 'Pago de factura no encontrado' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new PagoFacturaController();