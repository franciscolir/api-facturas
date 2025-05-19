const BaseService = require('./base.service');
const { DetalleFactura, Producto, Factura } = require('../models');

class DetalleFacturaService extends BaseService {
    constructor() {
        super(DetalleFactura);
    }

    // Métodos específicos para DetalleFactura
    async findByFacturaId(facturaId) {
        return await this.model.findAll({
            where: { factura_id: facturaId },
            include: [{ model: Producto }]
        });
    }

    async findByProductoId(productoId) {
        return await this.model.findAll({
            where: { producto_id: productoId },
            include: [{ model: Factura }]
        });
    }

    async createMany(detalles) {
        return await this.model.bulkCreate(detalles);
    }
}

module.exports = new DetalleFacturaService(); 