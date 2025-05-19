const BaseController = require('./base.controller');
const folioService = require('../services/folio.service');

class FolioController extends BaseController {
    constructor() {
        super(folioService);
    }

    // Métodos específicos para Folio
    async getByFacturaId(req, res) {
        try {
            const folio = await this.service.findByFacturaId(req.params.facturaId);
            if (folio) {
                res.json(folio);
            } else {
                res.status(404).json({ message: 'Folio not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByNumero(req, res) {
        try {
            const folio = await this.service.findByNumero(req.params.numero);
            if (folio) {
                res.json(folio);
            } else {
                res.status(404).json({ message: 'Folio not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getLastFolio(req, res) {
        try {
            const folio = await this.service.getLastFolio();
            if (folio) {
                res.json(folio);
            } else {
                res.status(404).json({ message: 'No folios found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new FolioController(); 