/**
 * Servicio para la gestión de Condiciones de Pago
 * Extiende BaseService e implementa lógica específica para condiciones de pago.
 * Permite búsquedas y operaciones relacionadas con las condiciones de pago del sistema.
 */
const BaseService = require('./base.service');
const { CondicionPago } = require('../models');
const { Op } = require('sequelize');

class CondicionPagoService extends BaseService {
    /**
     * Inicializa el servicio con el modelo de CondicionPago
     */
    constructor() {
        super(CondicionPago);
    }

    /**
     * Busca una condición de pago por su código único.
     * @param {string} codigo - Código de la condición de pago.
     * @returns {Promise<Object|null>} Condición encontrada o null.
     */
    async findByCodigo(codigo) {
        return await this.model.findOne({ where: { codigo, activo: true } });
    }

    /**
     * Busca condiciones de pago por plazo.
     * @param {number} plazo - Plazo de la condición de pago.
     * @returns {Promise<Array>} Lista de condiciones de pago que coinciden.
     */
    async findByPlazo(plazo) {
        return await this.model.findAll({ where: { plazo } });
    }

    /**
     * Busca condiciones de pago por descripción usando búsqueda parcial.
     * @param {string} descripcion - Texto a buscar en la descripción.
     * @returns {Promise<Array>} Lista de condiciones que coinciden.
     */
    async findByDescripcion(descripcion) {
        return await this.model.findAll({ 
            where: { 
                descripcion: {
                    [Op.like]: `%${descripcion}%`
                },
                activo: true
            } 
        });
    }

    /**
     * Crea una nueva condición de pago, validando que el código sea único.
     * @param {Object} data - Datos de la condición de pago.
     * @throws {Error} Si ya existe una condición con ese código.
     * @returns {Promise<Object>} Condición creada.
     */
    async create(data) {
        const existingCondicion = await this.findByCodigo(data.codigo);
        if (existingCondicion) {
            throw new Error('Ya existe una condición de pago con este código');
        }
        return await super.create(data);
    }

    /**
     * Actualiza una condición de pago, validando que el código sea único.
     * @param {number} id - ID de la condición de pago a actualizar.
     * @param {Object} data - Datos a actualizar.
     * @throws {Error} Si el nuevo código ya existe en otra condición de pago.
     * @returns {Promise<Object|null>} Condición actualizada o null.
     */
    async update(id, data) {
        if (data.codigo) {
            const existingCondicion = await this.findByCodigo(data.codigo);
            if (existingCondicion && existingCondicion.id !== id) {
                throw new Error('Ya existe una condición de pago con este código');
            }
        }
        return await super.update(id, data);
    }

    /**
     * Obtiene todas las condiciones de pago activas ordenadas por días de vencimiento.
     * @param {string} [orden='ASC'] - Orden de los resultados ('ASC' o 'DESC').
     * @returns {Promise<Array>} Lista ordenada de condiciones de pago activas.
     */
    async findAllOrdenadas(orden = 'ASC') {
        return await this.model.findAll({
            where: { activo: true },
            order: [['dias_venc', orden]],
        });
    }

    /**
     * Busca condiciones de pago por días de vencimiento.
     * @param {number} dias - Días de vencimiento de la condición de pago.
     * @returns {Promise<Array>} Lista de condiciones de pago que coinciden.
     */
    async findByDiasVencimiento(dias) {
        return await this.model.findAll({ where: { dias_venc: dias, activo: true } });
    }

    /**
     * Busca una condición de pago por su rut.
     * @param {string} rut - Rut de la condición de pago.
     * @returns {Promise<Object|null>} Condición encontrada o null.
     */
    async findByRut(rut) {
        return await this.model.findOne({ where: { rut, activo: true } });
    }

    /**
     * Busca una condición de pago por su email.
     * @param {string} email - Email de la condición de pago.
     * @returns {Promise<Object|null>} Condición encontrada o null.
     */
    async findByEmail(email) {
        return await this.model.findOne({ where: { email, activo: true } });
    }

    async findByRol(rol) {
        return await this.model.findAll({ where: { rol, activo: true } });
    }

    /**
     * Crea múltiples condiciones de pago a partir de un array
     * Valida unicidad de código para cada condición
     * @param {Array<Object>} condiciones - Array de condiciones a crear
     * @returns {Promise<Array>} Condiciones creadas
     * @throws {Error} Si algún código ya existe
     */
    async createMany(condiciones) {
        const condicionesCreadas = [];
        for (const data of condiciones) {
            const existingCondicion = await this.model.findOne({ where: { codigo: data.codigo } });
            if (existingCondicion) {
                throw new Error(`Ya existe una condición de pago con el código: ${data.codigo}`);
            }
            const condicion = await super.create(data);
            condicionesCreadas.push(condicion);
        }
        return condicionesCreadas;
    }
}

module.exports = new CondicionPagoService(); 