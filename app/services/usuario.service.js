const BaseService = require('./base.service');
const { Usuario } = require('../models');

class UsuarioService extends BaseService {
    constructor() {
        super(Usuario);
    }

    // Métodos específicos para Usuario
    async findByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }

    async findByUsername(username) {
        return await this.model.findOne({ where: { username } });
    }

    async create(data) {
        // Verificar si ya existe un usuario con el mismo email o username
        const existingEmail = await this.findByEmail(data.email);
        if (existingEmail) {
            throw new Error('Ya existe un usuario con este email');
        }

        const existingUsername = await this.findByUsername(data.username);
        if (existingUsername) {
            throw new Error('Ya existe un usuario con este nombre de usuario');
        }

        return await super.create(data);
    }

    async update(id, data) {
        // Si se está actualizando el email, verificar que no exista
        if (data.email) {
            const existingEmail = await this.findByEmail(data.email);
            if (existingEmail && existingEmail.id !== id) {
                throw new Error('Ya existe un usuario con este email');
            }
        }

        // Si se está actualizando el username, verificar que no exista
        if (data.username) {
            const existingUsername = await this.findByUsername(data.username);
            if (existingUsername && existingUsername.id !== id) {
                throw new Error('Ya existe un usuario con este nombre de usuario');
            }
        }

        return await super.update(id, data);
    }

    async findByRol(rol) {
        return await this.model.findAll({ where: { rol } });
    }

    async getActiveVendedores() {
        return await this.model.findAll({
            where: {
                rol: 'vendedor',
                activo: true
            }
        });
    }

    async toggleActivo(id) {
        const usuario = await this.model.findByPk(id);
        if (usuario) {
            return await usuario.update({ activo: !usuario.activo });
        }
        return null;
    }
}

module.exports = new UsuarioService();

