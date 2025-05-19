const BaseService = require('./base.service');
const { Factura, Cliente, Vendedor, CondicionPago, DetalleFactura, Producto } = require('../models');

class FacturaService extends BaseService {
    constructor() {
        super(Factura);
    }

    // Métodos específicos para Factura
    async findAllWithDetails() {
        return await this.model.findAll({
            include: [
                { model: Cliente },
                { model: Vendedor },
                { model: CondicionPago },
                { 
                    model: DetalleFactura,
                    include: [{ model: Producto }]
                }
            ]
        });
    }

    async findByClienteId(clienteId) {
        return await this.model.findAll({
            where: { cliente_id: clienteId },
            include: [
                { model: DetalleFactura, include: [{ model: Producto }] }
            ]
        });
    }

    async findByVendedorId(vendedorId) {
        return await this.model.findAll({
            where: { vendedor_id: vendedorId },
            include: [
                { model: Cliente },
                { model: DetalleFactura, include: [{ model: Producto }] }
            ]
        });
    }

    async findByFecha(fecha) {
        return await this.model.findAll({
            where: { fecha },
            include: [
                { model: Cliente },
                { model: Vendedor },
                { model: DetalleFactura, include: [{ model: Producto }] }
            ]
        });
    }
}

module.exports = new FacturaService(); 