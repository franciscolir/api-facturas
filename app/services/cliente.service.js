const BaseService = require('./base.service');
const { Cliente } = require('../models');

class ClienteService extends BaseService {
    constructor() {
        super(Cliente);
    }

    // Aquí puedes agregar métodos específicos para Cliente
    async findByRut(rut) {
        return await this.model.findOne({ where: { rut } });
    }
}

module.exports = new ClienteService(); 