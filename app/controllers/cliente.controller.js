const BaseController = require('./base.controller');
const clienteService = require('../services/cliente.service');

class ClienteController extends BaseController {
    constructor() {
        super(clienteService);
    }

    // Aquí puedes agregar métodos específicos para Cliente
    async getByRut(req, res) {
        try {
            const cliente = await this.service.findByRut(req.params.rut);
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ClienteController(); 