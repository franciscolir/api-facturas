const BaseService = require('./base.service');
const { Folio, Factura } = require('../models');

class FolioService extends BaseService {
    constructor() {
        super(Folio);
    }

    // Métodos específicos para Folio
    async findByFacturaId(facturaId) {
        return await this.model.findOne({
            where: { id_factura: facturaId },
            include: [{ model: Factura }]
        });
    }

    async findByNumero(numero) {
        return await this.model.findOne({
            where: { numero },
            include: [{ model: Factura }]
        });
    }

    async getLastFolio() {
        return await this.model.findOne({
            order: [['numero', 'DESC']]
        });
    }
}

module.exports = new FolioService(); 