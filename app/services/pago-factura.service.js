/**
 * Servicio para la gestión de Pagos de Facturas
 * Extiende el servicio base e implementa funcionalidades específicas para pagos de facturas
 */
const BaseService = require('./base.service');
const { PagoFactura, Factura, CondicionesPago, Cliente } = require('../models');

class PagoFacturaService extends BaseService {
    constructor() {
        super(PagoFactura);
    }

    /**
     * Obtiene todos los pagos de factura con sus relaciones
     * @returns {Promise<Array>} Lista de pagos de factura con relaciones
     */
    async findAllWithDetails() {
        return await this.model.findAll({
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }

    /**
     * Obtiene un pago de factura específico con sus relaciones
     * @param {number} id - ID del pago de factura
     * @returns {Promise<Object>} Pago de factura con relaciones
     */
    async findByIdWithDetails(id) {
        return await this.model.findOne({
            where: { id, activo: true },
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }

    /**
     * Busca pagos de factura por ID de factura
     * @param {number} facturaId - ID de la factura
     * @returns {Promise<Array>} Pagos de la factura
     */
    async findByFacturaId(facturaId) {
        return await this.model.findAll({
            where: { factura_id: facturaId, activo: true },
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }

    /**
     * Marca un pago de factura como pagado
     * @param {number} id - ID del pago de factura
     * @returns {Promise<Object|null>} Pago de factura actualizado
     */
    async marcarComoPagada(id) {
        return await this.update(id, { estado: 'pagada' });
    }

    /**
     * Marca un pago de factura como vencido
     * @param {number} id - ID del pago de factura
     * @returns {Promise<Object|null>} Pago de factura actualizado
     */
    async marcarComoVencida(id) {
        return await this.update(id, { estado: 'vencida' });
    }
}

module.exports = new PagoFacturaService();