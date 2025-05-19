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

    async create(data) {
        // Verificar si ya existe un cliente con el mismo RUT
        const existingCliente = await this.findByRut(data.rut);
        if (existingCliente) {
            throw new Error('Ya existe un cliente con este RUT');
        }
        return await super.create(data);
    }

    async update(id, data) {
        // Si se está actualizando el RUT, verificar que no exista
        if (data.rut) {
            const existingCliente = await this.findByRut(data.rut);
            if (existingCliente && existingCliente.id !== id) {
                throw new Error('Ya existe un cliente con este RUT');
            }
        }
        return await super.update(id, data);
    }
}

module.exports = new ClienteService(); 