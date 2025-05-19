const BaseService = require('./base.service');
const { CondicionPago } = require('../models');
const { Op } = require('sequelize');

class CondicionPagoService extends BaseService {
    constructor() {
        super(CondicionPago);
    }

    // Métodos específicos para CondicionPago
    async findByPlazo(plazo) {
        return await this.model.findAll({ where: { plazo } });
    }

    async findByDescripcion(descripcion) {
        return await this.model.findOne({ 
            where: { 
                descripcion: {
                    [Op.like]: `%${descripcion}%`
                }
            } 
        });
    }

    async findByCodigo(codigo) {
        return await this.model.findOne({ where: { codigo } });
    }

    async create(data) {
        // Verificar si ya existe una condición de pago con el mismo código
        const existingCondicion = await this.findByCodigo(data.codigo);
        if (existingCondicion) {
            throw new Error('Ya existe una condición de pago con este código');
        }
        return await super.create(data);
    }

    async update(id, data) {
        // Si se está actualizando el código, verificar que no exista
        if (data.codigo) {
            const existingCondicion = await this.findByCodigo(data.codigo);
            if (existingCondicion && existingCondicion.id !== id) {
                throw new Error('Ya existe una condición de pago con este código');
            }
        }
        return await super.update(id, data);
    }
}

module.exports = new CondicionPagoService(); 