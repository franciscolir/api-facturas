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

    async findByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }

    async findByRut(rut) {
        return await this.model.findOne({ where: { rut } });
    }

    async create(data) {
        // Verificar si ya existe un vendedor con el mismo email
        const existingVendedor = await this.findByEmail(data.email);
        if (existingVendedor) {
            throw new Error('Ya existe un vendedor con este email');
        }
        // Verificar si ya existe un vendedor con el mismo RUT
        const existingVendedorRut = await this.findByRut(data.rut);
        if (existingVendedorRut) {
            throw new Error('Ya existe un vendedor con este RUT');
        }
        return await super.create(data);
    }

    async update(id, data) {
        // Si se está actualizando el email, verificar que no exista
        if (data.email) {
            const existingVendedor = await this.findByEmail(data.email);
            if (existingVendedor && existingVendedor.id !== id) {
                throw new Error('Ya existe un vendedor con este email');
            }
        }
        // Si se está actualizando el RUT, verificar que no exista
        if (data.rut) {
            const existingVendedorRut = await this.findByRut(data.rut);
            if (existingVendedorRut && existingVendedorRut.id !== id) {
                throw new Error('Ya existe un vendedor con este RUT');
            }
        }
        return await super.update(id, data);
    }
}

module.exports = new VendedorService(); 