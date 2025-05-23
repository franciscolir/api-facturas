const BaseController = require('./base.controller');
const vendedorService = require('../services/vendedor.service');

class VendedorController extends BaseController {
    constructor() {
        super(vendedorService);
    }

    // Métodos específicos para Vendedor
    async getByCode(req, res) {
        try {
            const vendedor = await this.service.findByCode(req.params.codigo);
            if (vendedor) {
                res.json(vendedor);
            } else {
                res.status(404).json({ message: 'Vendedor not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByRut(req, res) {
        try {
            const { rut } = req.params;
            const vendedor = await vendedorService.findByRut(rut);
            
            if (!vendedor) {
                return res.status(404).json({
                    message: 'Vendedor no encontrado'
                });
            }

            return res.status(200).json(vendedor);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar vendedor por RUT',
                error: error.message
            });
        }
    }
}

module.exports = new VendedorController(); 