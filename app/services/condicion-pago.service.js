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
}

module.exports = new CondicionPagoService(); 