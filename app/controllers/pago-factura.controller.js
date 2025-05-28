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
     * Obtiene todos los pagos de factura con sus relaciones
     * GET /api/pagos-factura/with-details
     */
    async getAllWithDetails(req, res) {
        try {
            // Llama al servicio para obtener todos los pagos con detalles asociados
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
            // Busca el pago por ID e incluye detalles relacionados
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
     * Obtiene la lista de facturas vencidas del día de hoy
     * GET /api/pagos-factura/vencidas-hoy
     */
    async getVencidas(req, res) {
        try {
            // Busca los pagos vencidos cuya fecha de vencimiento es hoy
            const vencidas = await this.service.findVencidasHoy();
            return res.status(200).json(vencidas);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al obtener facturas vencidas del día',
                error: error.message
            });
        }
    }

    /**
     * Obtiene la lista de facturas pagadas
     * GET /api/pagos-factura/pagadas
     */
    async getPagadas(req, res) {
        try {
            // Busca todos los pagos con estado 'pagada'
            const pagadas = await this.service.findPagadas();
            return res.status(200).json(pagadas);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al obtener facturas pagadas',
                error: error.message
            });
        }
    }

    /**
     * Obtiene la lista de facturas pendientes
     * GET /api/pagos-factura/pendientes
     */
    async getPendientes(req, res) {
        try {
            // Busca todos los pagos con estado 'pendiente'
            const pendientes = await this.service.findPendientes();
            return res.status(200).json(pendientes);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al obtener facturas pendientes',
                error: error.message
            });
        }
    }

    /**
     * Obtiene la lista de todas las facturas vencidas
     * GET /api/pagos-factura/vencidas
     */
    async getTodasVencidas(req, res) {
        try {
            // Busca todos los pagos con estado 'vencida'
            const vencidas = await this.service.findVencidas();
            return res.status(200).json(vencidas);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al obtener todas las facturas vencidas',
                error: error.message
            });
        }
    }

    /**
     * Consulta facturas por estado y cliente
     * GET /api/pagos-factura/cliente/:clienteId/:estado
     * Permite filtrar pagos por estado ('vencida', 'pagada', 'pendiente') y cliente
     */
    async getByEstadoYCliente(req, res) {
        try {
            const { clienteId, estado } = req.params;
            // Validar que el estado sea permitido
            const estadosPermitidos = ['vencida', 'pagada', 'pendiente'];
            if (!estadosPermitidos.includes(estado)) {
                return res.status(400).json({ message: 'Estado no válido' });
            }
            // Busca los pagos filtrados por estado y cliente
            const pagos = await this.service.findByEstadoYCliente(estado, clienteId);
            return res.status(200).json(pagos);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al consultar facturas por estado y cliente',
                error: error.message
            });
        }
    }

    /**
     * Obtiene la lista de facturas por estado
     * GET /api/pagos-factura/estado/:estado
     * Permite filtrar pagos por estado ('vencida', 'pagada', 'pendiente')
     */
    async getByEstado(req, res) {
        try {
            const { estado } = req.params;
            const estadosPermitidos = ['vencida', 'pagada', 'pendiente'];
            // Valida que el estado sea uno de los permitidos
            if (!estadosPermitidos.includes(estado)) {
                return res.status(400).json({ message: 'Estado no válido' });
            }
            // Busca los pagos filtrados por estado
            const pagos = await this.service.findByEstado(estado);
            return res.status(200).json(pagos);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al obtener facturas por estado',
                error: error.message
            });
        }
    }
}

module.exports = new PagoFacturaController();