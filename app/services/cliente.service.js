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

    /**
     * Busca un cliente por su RUT
     * @param {string} rut - RUT del cliente
     * @returns {Promise<Object|null>} Cliente encontrado o null
     */
    async findByRut(rut) {
        return await this.model.findOne({ where: { rut } });
    }

    /**
     * Crea un nuevo cliente, validando que el RUT no exista previamente
     * @param {Object} data - Datos del cliente
     * @returns {Promise<Object>} Cliente creado
     * @throws {Error} Si el RUT ya existe
     */
    async create(data) {
        // Verificar si ya existe un cliente con el mismo RUT
        const existingCliente = await this.findByRut(data.rut);
        if (existingCliente) {
            throw new Error('Ya existe un cliente con este RUT');
        }
        return await super.create(data);
    }

    /**
     * Actualiza un cliente, validando que el nuevo RUT (si se cambia) no exista en otro cliente
     * @param {number} id - ID del cliente a actualizar
     * @param {Object} data - Datos a actualizar
     * @returns {Promise<Object>} Cliente actualizado
     * @throws {Error} Si el nuevo RUT ya existe en otro cliente
     */
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
            // Crea el cliente y lo agrega al array de resultados
            const cliente = await super.create(data);
            clientesCreados.push(cliente);
        }
        // Retorna el array de clientes creados
        return clientesCreados;
    }
}

module.exports = new ClienteService();