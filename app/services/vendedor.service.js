/**
 * Servicio para la gestión de Vendedores
 * Extiende BaseService e implementa lógica específica para vendedores.
 * Permite búsquedas y operaciones relacionadas con vendedores del sistema.
 */
const BaseService = require('./base.service');
const { Vendedor } = require('../models');

class VendedorService extends BaseService {
    /**
     * Inicializa el servicio con el modelo de Vendedor
     */
    constructor() {
        super(Vendedor);
    }

    /**
     * Crea múltiples vendedores a partir de un array
     * Valida unicidad de email para cada vendedor
     * @param {Array<Object>} vendedores - Array de vendedores a crear
     * @returns {Promise<Array>} Vendedores creados
     * @throws {Error} Si algún email ya existe
     */
    async createMany(vendedores) {
        const vendedoresCreados = [];
        for (const data of vendedores) {
            const existingVendedor = await this.model.findOne({ where: { email: data.email } });
            if (existingVendedor) {
                throw new Error(`Ya existe un vendedor con el email: ${data.email}`);
            }
            const vendedor = await super.create(data);
            vendedoresCreados.push(vendedor);
        }
        return vendedoresCreados;
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