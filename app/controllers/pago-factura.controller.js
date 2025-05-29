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
        // Inicializa el controlador base con el servicio de pagos de factura
        super(pagoFacturaService);
    }


    /**
     * Busca pagos de factura por ID de factura
     * GET /api/pagos-factura/factura/:facturaId
     */
    async getByFacturaId(req, res) {
        try {
            // Busca todos los pagos asociados a una factura específica
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
            // Cambia el estado del pago a 'pagada'
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
            // Cambia el estado del pago a 'vencida'
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

    /**
     * Consulta pagos de factura por estado y opcionalmente por cliente
     * GET /api/pagos-factura/estado/:estado
     * GET /api/pagos-factura/cliente/:clienteId/:estado
     */
async getByEstado(req, res) {
    try {
        const { estado, clienteId } = req.params;
        const estadosPermitidos = ['vencida', 'pagada', 'pendiente'];
        if (!estadosPermitidos.includes(estado)) {
            return res.status(400).json({ message: 'Estado no válido', estadoRecibido: estado });
        }
        let clienteIdNum = null;
        if (clienteId !== undefined) {
            clienteIdNum = Number(clienteId);
            if (isNaN(clienteIdNum) || clienteIdNum <= 0) {
                return res.status(400).json({ message: 'clienteId debe ser un número válido', clienteId });
            }
        }
        const pagos = await this.service.findByEstado({
            estado,
            clienteId: clienteIdNum
        });
        return res.status(200).json(pagos);
    } catch (error) {
        // Diferenciar error de parámetros y error interno
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
        return res.status(500).json({
            message: 'Error interno al obtener pagos de factura por estado',
            error: error.message,
            stack: error.stack
        });
    }
}

    /**
     * Consulta pagos de factura vencidos hoy
     * GET /api/pagos-factura/vencidas-hoy
     */
async getVencidasHoy(req, res) {
    try {
        const vencidas = await this.service.findVencidasHoy();
        return res.status(200).json(vencidas);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno al obtener facturas vencidas del día',
            error: error.message,
            stack: error.stack
        });
    }
}
}
module.exports = new PagoFacturaController();