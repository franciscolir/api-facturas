/**
 * Servicio para la gestión de Detalles de Factura
 * Extiende BaseService e implementa lógica específica para detalles de factura.
 * Permite búsquedas y operaciones relacionadas con los ítems de cada factura.
 */
const BaseService = require('./base.service');
const { DetalleFactura, Producto, Factura } = require('../models');

class DetalleFacturaService extends BaseService {
    /**
     * Inicializa el servicio con el modelo de DetalleFactura
     */
    constructor() {
        super(DetalleFactura);
    }

    /**
     * Busca todos los detalles de una factura específica
     * Incluye información completa de los productos
     * @param {number} facturaId - ID de la factura
     * @returns {Promise<Array>} Lista de detalles con sus productos
     */
    async findByFacturaId(facturaId) {
        return await this.model.findAll({
            where: { factura_id: facturaId },
            include: [{ model: Producto }]
        });
    }

    /**
     * Busca todos los detalles que incluyen un producto específico
     * Útil para rastrear el historial de ventas de un producto
     * @param {number} productoId - ID del producto
     * @returns {Promise<Array>} Lista de detalles con información de facturas
     */
    async findByProductoId(productoId) {
        return await this.model.findAll({
            where: { producto_id: productoId },
            include: [{ model: Factura }]
        });
    }

    /**
     * Crea múltiples detalles de factura en una sola operación
     * Útil para crear todos los detalles de una factura de una vez
     * @param {Array<Object>} detalles - Array de detalles a crear
     * @returns {Promise<Array>} Detalles creados
     */
    async createMany(detalles) {
        return await this.model.bulkCreate(detalles);
    }
}

module.exports = new DetalleFacturaService(); 