const BaseService = require('./base.service');
const { Folio } = require('../models');

class FolioService extends BaseService {
    constructor() {
        super(Folio);
    }

    async findByTipo(tipo) {
        return await this.model.findAll({ where: { tipo } });
    }

    async findByFacturaId(facturaId) {
        return await this.model.findOne({ where: { factura_id: facturaId } });
    }

    async findByNumero(numero) {
        return await this.model.findOne({ where: { numero } });
    }

    async findLastFolio() {
        return await this.model.findOne({
            order: [['createdAt', 'DESC']]
        });
    }

    async create(data) {
        // Verificar si ya existe un folio con el mismo número
        if (data.numero) {
            const existingFolio = await this.findByNumero(data.numero);
            if (existingFolio) {
                throw new Error('Ya existe un folio con este número');
            }
        }
        return await super.create(data);
    }

    async update(id, data) {
        // Si se está actualizando el número, verificar que no exista
        if (data.numero) {
            const existingFolio = await this.findByNumero(data.numero);
            if (existingFolio && existingFolio.id !== id) {
                throw new Error('Ya existe un folio con este número');
            }
        }
        return await super.update(id, data);
    }
}

module.exports = new FolioService(); 