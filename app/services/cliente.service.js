/**
 * Servicio para la gestión de Clientes
 * Extiende BaseService e implementa lógica específica para clientes.
 * Permite búsquedas y operaciones relacionadas con clientes del sistema.
 */
const BaseService = require('./base.service');
const { Cliente } = require('../models');

class ClienteService extends BaseService {
    /**
     * Inicializa el servicio con el modelo de Cliente
     */
    constructor() {
        super(Cliente);
    }

    // Métodos específicos para Cliente
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

    /**
     * Crea múltiples clientes a partir de un array
     * Valida unicidad de RUT para cada cliente
     * @param {Array<Object>} clientes - Array de clientes a crear
     * @returns {Promise<Array>} Clientes creados
     * @throws {Error} Si algún RUT ya existe
     */
    async createMany(clientes) {
        const clientesCreados = [];
        for (const data of clientes) {
            // Verificar si ya existe un cliente con el mismo RUT
            const existingCliente = await this.findByRut(data.rut);
            if (existingCliente) {
                throw new Error(`Ya existe un cliente con el RUT: ${data.rut}`);
            }
            const cliente = await super.create(data);
            clientesCreados.push(cliente);
        }
        return clientesCreados;
    }
}

module.exports = new ClienteService(); 