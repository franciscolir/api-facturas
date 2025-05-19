const BaseController = require('./base.controller');
const condicionPagoService = require('../services/condicion-pago.service');

class CondicionPagoController extends BaseController {
    constructor() {
        super(condicionPagoService);
    }

    // Métodos específicos para CondicionPago
    async getByPlazo(req, res) {
        try {
            const condiciones = await this.service.findByPlazo(req.params.plazo);
            res.json(condiciones);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByDescripcion(req, res) {
        try {
            const condicion = await this.service.findByDescripcion(req.params.descripcion);
            if (condicion) {
                res.json(condicion);
            } else {
                res.status(404).json({ message: 'Condición de pago not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CondicionPagoController(); 