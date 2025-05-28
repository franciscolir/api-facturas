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
     * Obtiene todos los pagos de factura marcados como vencidos
     * @returns {Promise<Array>} Lista de pagos vencidos
     */
    async findVencidas() {
        return await this.model.findAll({
            where: { estado: 'vencida', activo: true },
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }

    /**
     * Obtiene todos los pagos de factura marcados como vencidos en el día de hoy
     * @returns {Promise<Array>} Lista de pagos vencidos hoy
     */
    async findVencidasHoy() {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Inicio del día
        const manana = new Date(hoy);
        manana.setDate(hoy.getDate() + 1); // Siguiente día

        return await this.model.findAll({
            where: {
                estado: 'vencida',
                activo: true,
                vencimiento: {
                    [this.model.sequelize.Op.gte]: hoy,
                    [this.model.sequelize.Op.lt]: manana
                }
            },
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }

    /**
     * Obtiene todos los pagos de factura marcados como pagados
     * @returns {Promise<Array>} Lista de pagos pagados
     */
    async findPagadas() {
        return await this.model.findAll({
            where: { estado: 'pagada', activo: true },
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }

    /**
     * Obtiene todos los pagos de factura en estado pendiente
     * @returns {Promise<Array>} Lista de pagos pendientes
     */
    async findPendientes() {
        return await this.model.findAll({
            where: { estado: 'pendiente', activo: true },
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }

    /**
     * Obtiene los pagos de factura por estado y cliente
     * @param {string} estado - Estado del pago ('vencida', 'pagada', 'pendiente')
     * @param {number} clienteId - ID del cliente
     * @returns {Promise<Array>} Lista de pagos filtrados
     */
    async findByEstadoYCliente(estado, clienteId) {
        return await this.model.findAll({
            where: {
                estado,
                activo: true,
                cliente_id_facturas: clienteId
            },
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }

    /**
     * Obtiene los pagos de factura por estado
     * @param {string} estado - Estado del pago ('vencida', 'pagada', 'pendiente')
     * @returns {Promise<Array>} Lista de pagos filtrados
     */
    async findByEstado(estado) {
        return await this.model.findAll({
            where: {
                estado,
                activo: true
            },
            include: [
                { model: Factura },
                { model: CondicionesPago },
                { model: Cliente }
            ]
        });
    }
}


module.exports = PagoFacturaService;
module.exports = new PagoFacturaService();