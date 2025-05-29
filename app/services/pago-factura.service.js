/**
 * Servicio para la gestión de Pagos de Facturas
 * Extiende el servicio base e implementa funcionalidades específicas para pagos de facturas
 */
const BaseService = require('./base.service');
const { PagoFactura, Factura, CondicionesPago, Cliente } = require('../models');
const { Op } = require('sequelize');

class PagoFacturaService extends BaseService {
    constructor() {
        super(PagoFactura);
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
        // Actualiza el estado del pago a 'pagada'
        return await this.update(id, { estado: 'pagada' });
    }

    /**
     * Marca un pago de factura como vencido
     * @param {number} id - ID del pago de factura
     * @returns {Promise<Object|null>} Pago de factura actualizado
     */
    async marcarComoVencida(id) {
        // Actualiza el estado del pago a 'vencida'
        return await this.update(id, { estado: 'vencida' });
    }

    /**
     * Marca automáticamente como vencidos los pagos cuya fecha de vencimiento ya pasó y están pendientes
     * @returns {Promise<Array>} Lista de pagos que fueron marcados como vencidos
     */
    async marcarPagosVencidosAutomaticamente() {
        // Obtiene la fecha actual
        const hoy = new Date();
        const { Op } = this.model.sequelize;
        // Busca todos los pagos en estado 'pendiente' cuyo vencimiento ya pasó y están activos
        const pagos = await this.model.findAll({
            where: {
                estado: 'pendiente',
                vencimiento: { [Op.lt]: hoy },
                activo: true
            }
        });

        // Lista para almacenar los pagos actualizados
        const pagosVencidos = [];

        // Para cada pago encontrado, actualiza su estado a 'vencida'
        for (const pago of pagos) {
            await pago.update({ estado: 'vencida' });
            pagosVencidos.push(pago);
        }
        // Retorna la lista de pagos que fueron marcados como vencidos
        return pagosVencidos;
    }



    /**
     * Consulta pagos de factura por estado y opcionalmente por cliente.
     * @param {string} estado - Estado del pago ('vencida', 'pagada', 'pendiente')
     * @param {number|null} clienteId - ID del cliente (opcional)
     * @returns {Promise<Array>} Lista de pagos filtrados
     */
    async findByEstado({ estado, clienteId = null }) {
        const where = {
            estado,
            activo: true
        };
        if (clienteId && !isNaN(clienteId)) {
            where.cliente_id_facturas = clienteId;
        }
        return await this.model.findAll({
            where,
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }

    /**
     * Consulta pagos de factura vencidos hoy (estado = 'vencida' y vencimiento = hoy)
     * @returns {Promise<Array>} Lista de pagos vencidos hoy
     */
    async findVencidasHoy() {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const manana = new Date(hoy);
        manana.setDate(hoy.getDate() + 1);

        return await this.model.findAll({
            where: {
                estado: 'vencida',
                activo: true,
                vencimiento: {
                    [Op.gte]: hoy,
                    [Op.lt]: manana
                }
            },
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }
}

module.exports = new PagoFacturaService();