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

    async createBulk(detalles) {
        try {
            // Validar que todos los detalles tengan los campos requeridos
            for (const detalle of detalles) {
                if (!detalle.factura_id || !detalle.producto_id || !detalle.cantidad || !detalle.precio_unitario) {
                    throw new Error('Todos los detalles deben tener factura_id, producto_id, cantidad y precio_unitario');
                }
            }

            // Crear todos los detalles en una transacción
            const detallesCreados = await this.model.bulkCreate(detalles, {
                returning: true,
                validate: true
            });

            return detallesCreados;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new Error('Error de validación: ' + error.message);
            }
            throw new Error(`Error al crear detalles de factura: ${error.message}`);
        }
    }
}

module.exports = new DetalleFacturaService(); 