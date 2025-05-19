const BaseService = require('./base.service');
const { Producto } = require('../models');

class ProductoService extends BaseService {
    constructor() {
        super(Producto);
    }

    // Métodos específicos para Producto
    async findByCodigo(codigo) {
        return await this.model.findOne({ where: { codigo } });
    }

    async findByCategoria(categoria) {
        return await this.model.findAll({ where: { categoria } });
    }

    async create(data) {
        // Verificar si ya existe un producto con el mismo código
        const existingProducto = await this.findByCodigo(data.codigo);
        if (existingProducto) {
            throw new Error('Ya existe un producto con este código');
        }
        return await super.create(data);
    }

    async update(id, data) {
        // Si se está actualizando el código, verificar que no exista
        if (data.codigo) {
            const existingProducto = await this.findByCodigo(data.codigo);
            if (existingProducto && existingProducto.id !== id) {
                throw new Error('Ya existe un producto con este código');
            }
        }
        return await super.update(id, data);
    }
}

module.exports = new ProductoService(); 