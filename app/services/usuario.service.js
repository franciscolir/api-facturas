/**
 * Servicio para la gestión de Usuarios
 * Extiende BaseService e implementa lógica específica para usuarios.
 */
const BaseService = require('./base.service');
const { Usuario } = require('../models');

class UsuarioService extends BaseService {
    constructor() {
        super(Usuario);
    }

    // Buscar usuario por email
    async findByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }

    // Crear usuario (verifica unicidad de email)
    async create(data) {
        const existingEmail = await this.findByEmail(data.email);
        if (existingEmail) {
            throw new Error('Ya existe un usuario con este email');
        }

        // Validar que el rol sea uno de los permitidos
        const rolesPermitidos = ['usuario', 'admin'];
        if (!rolesPermitidos.includes(data.rol)) {
            throw new Error('El rol asignado no es valido');
        }
        
        return await super.create(data);
    }

    // Actualizar usuario (verifica unicidad de email)
    async update(id, data) {
        if (data.email) {
            const existingEmail = await this.findByEmail(data.email);
            if (existingEmail && existingEmail.id !== id) {
                throw new Error('Ya existe un usuario con este email');
            }
        }
        return await super.update(id, data);
    }
}

module.exports = new UsuarioService();

