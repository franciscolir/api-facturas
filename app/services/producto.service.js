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
}

module.exports = new ProductoService(); 