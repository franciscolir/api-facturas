const BaseController = require('./base.controller');
const FolioService = require('../services/folio.service');

class FolioController extends BaseController {
    constructor() {
        super(FolioService);
    }

    async getByTipo(req, res) {
        try {
            const { tipo } = req.params;
            const folios = await FolioService.findByTipo(tipo);
            
            if (!folios || folios.length === 0) {
                return res.status(404).json({
                    message: 'No se encontraron folios del tipo especificado'
                });
            }

            res.json(folios);
        } catch (error) {
            console.error('Error al obtener folios por tipo:', error);
            res.status(500).json({
                message: 'Error al obtener folios por tipo',
                error: error.message
            });
        }
    }

    async getByFacturaId(req, res) {
        try {
            const { facturaId } = req.params;
            const folio = await FolioService.findByFacturaId(facturaId);
            
            if (!folio) {
                return res.status(404).json({
                    message: 'No se encontró el folio para la factura especificada'
                });
            }

            res.json(folio);
        } catch (error) {
            console.error('Error al obtener folio por factura:', error);
            res.status(500).json({
                message: 'Error al obtener folio por factura',
                error: error.message
            });
        }
    }

    async getByNumero(req, res) {
        try {
            const { numero } = req.params;
            const folio = await FolioService.findByNumero(numero);
            
            if (!folio) {
                return res.status(404).json({
                    message: 'No se encontró el folio con el número especificado'
                });
            }

            res.json(folio);
        } catch (error) {
            console.error('Error al obtener folio por número:', error);
            res.status(500).json({
                message: 'Error al obtener folio por número',
                error: error.message
            });
        }
    }

    async getLastFolio(req, res) {
        try {
            const folio = await FolioService.findLastFolio();
            
            if (!folio) {
                return res.status(404).json({
                    message: 'No se encontró ningún folio'
                });
            }

            res.json(folio);
        } catch (error) {
            console.error('Error al obtener último folio:', error);
            res.status(500).json({
                message: 'Error al obtener último folio',
                error: error.message
            });
        }
    }
}

module.exports = FolioController; 