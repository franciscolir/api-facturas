const BaseService = require('./base.service');
const { Vendedor } = require('../models');

class VendedorService extends BaseService {
    constructor() {
        super(Vendedor);
    }

    // Métodos específicos para Vendedor
    async findByCode(codigo) {
        return await this.model.findOne({ where: { codigo } });
    }
}

module.exports = new VendedorService(); 