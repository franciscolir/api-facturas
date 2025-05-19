const BaseController = require('./base.controller');
const userService = require('../services/user.service');

class UserController extends BaseController {
    constructor() {
        super(userService);
    }

    // Métodos específicos para User
    async getByEmail(req, res) {
        try {
            const user = await this.service.findByEmail(req.params.email);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getByRol(req, res) {
        try {
            const users = await this.service.findByRol(req.params.rol);
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getActiveVendedores(req, res) {
        try {
            const vendedores = await this.service.findActiveVendedores();
            res.json(vendedores);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async toggleActivo(req, res) {
        try {
            const user = await this.service.toggleActivo(req.params.id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
