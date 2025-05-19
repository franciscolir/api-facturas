const BaseService = require('./base.service');
const { User } = require('../models');

class UserService extends BaseService {
    constructor() {
        super(User);
    }

    // Métodos específicos para User
    async findByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }

    async findByRol(rol) {
        return await this.model.findAll({ where: { rol, activo: true } });
    }

    async findActiveVendedores() {
        return await this.model.findAll({ 
            where: { 
                rol: 'vendedor',
                activo: true 
            }
        });
    }

    async toggleActivo(id) {
        const user = await this.model.findByPk(id);
        if (user) {
            return await user.update({ activo: !user.activo });
        }
        return null;
    }
}

module.exports = new UserService();

