/**
 * Servicio para la gestión de Usuarios
 * Extiende BaseService e implementa lógica específica para usuarios.
 * Permite búsquedas y operaciones relacionadas con usuarios del sistema.
 */
const BaseService = require('./base.service');
const { User } = require('../models');

class UsuarioService extends BaseService {
    /**
     * Inicializa el servicio con el modelo de Usuario
     */
    constructor() {
        super(User);
    }

    /**
     * Busca un usuario por su email
     * @param {string} email - Email del usuario a buscar
     * @returns {Promise<Object>} Usuario encontrado o null
     */
    async findByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }

    /**
     * Busca un usuario por su nombre de usuario
     * @param {string} username - Nombre de usuario a buscar
     * @returns {Promise<Object>} Usuario encontrado o null
     */
    async findByUsername(username) {
        return await this.model.findOne({ where: { username } });
    }

    /**
     * Crea un nuevo usuario
     * @param {Object} data - Datos del usuario a crear
     * @returns {Promise<Object>} Usuario creado
     * @throws {Error} Si ya existe un usuario con el mismo email o username
     */
    async create(data) {
        // Verificar unicidad de email
        const existingEmail = await this.findByEmail(data.email);
        if (existingEmail) {
            throw new Error('Ya existe un usuario con este email');
        }

        // Verificar unicidad de username
        const existingUsername = await this.findByUsername(data.username);
        if (existingUsername) {
            throw new Error('Ya existe un usuario con este nombre de usuario');
        }

        return await super.create(data);
    }

    /**
     * Actualiza un usuario existente
     * @param {number} id - ID del usuario a actualizar
     * @param {Object} data - Datos a actualizar
     * @returns {Promise<Object>} Usuario actualizado
     * @throws {Error} Si ya existe otro usuario con el mismo email o username
     */
    async update(id, data) {
        // Verificar unicidad de email si se está actualizando
        if (data.email) {
            const existingEmail = await this.findByEmail(data.email);
            if (existingEmail && existingEmail.id !== id) {
                throw new Error('Ya existe un usuario con este email');
            }
        }

        // Verificar unicidad de username si se está actualizando
        if (data.username) {
            const existingUsername = await this.findByUsername(data.username);
            if (existingUsername && existingUsername.id !== id) {
                throw new Error('Ya existe un usuario con este nombre de usuario');
            }
        }

        return await super.update(id, data);
    }

    /**
     * Busca usuarios por rol
     * @param {string} rol - Rol a buscar
     * @returns {Promise<Array>} Lista de usuarios con el rol especificado
     */
    async findByRol(rol) {
        return await this.model.findAll({ where: { rol } });
    }

    /**
     * Obtiene todos los vendedores activos
     * @returns {Promise<Array>} Lista de vendedores activos
     */
    async getActiveVendedores() {
        return await this.model.findAll({
            where: {
                rol: 'vendedor',
                activo: true
            }
        });
    }

    /**
     * Activa/desactiva un usuario
     * @param {number} id - ID del usuario
     * @returns {Promise<Object>} Usuario actualizado o null si no existe
     */
    async toggleActivo(id) {
        const usuario = await this.model.findByPk(id);
        if (usuario) {
            return await usuario.update({ activo: !usuario.activo });
        }
        return null;
    }
}

module.exports = new UsuarioService();

