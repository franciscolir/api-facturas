/**
 * Controlador de Usuarios
 * Gestiona las operaciones relacionadas con los usuarios del sistema
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para autenticación y gestión de usuarios
 */
const BaseController = require('./base.controller');
const UsuarioService = require('../services/usuario.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuarioController extends BaseController {
    constructor() {
        super(UsuarioService);
    }

    // LOGIN USUARIO
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email y password son requeridos' });
            }
            const usuario = await UsuarioService.findByEmail(email);
            if (!usuario) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            const validPassword = await bcrypt.compare(password, usuario.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );
            res.json({
                token,
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    username: usuario.username,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    rol: usuario.rol
                }
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
        }
    }

    // GET ALL USUARIOS
    async getAll(req, res) {
        try {
            const usuarios = await this.service.findAll();
            res.status(200).json(usuarios.map(u => u.toPublicJSON()));
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
        }
    }

    // GET USUARIO POR ID
    async getByPk(req, res) {
        try {
            const usuario = await this.service.findByPk(req.params.id);
            if (!usuario) {
                return res.status(404).json({ message: 'No se encontró el usuario' });
            }
            res.json(usuario ? usuario.toPublicJSON() : {});
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
        }
    }

    // CREAR USUARIO
    async create(req, res) {
        try {
            const { password, ...userData } = req.body;
            // Verificar unicidad de email y username
            const existingEmail = await this.service.findByEmail(userData.email);
            if (existingEmail) {
                return res.status(400).json({ message: 'Ya existe un usuario con este email' });
            }
            if (userData.username) {
                const existingUsername = await this.service.findByUsername(userData.username);
                if (existingUsername) {
                    return res.status(400).json({ message: 'Ya existe un usuario con este nombre de usuario' });
                }
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const usuario = await this.service.create({ ...userData, password: hashedPassword });
            res.status(201).json({
                id: usuario.id,
                email: usuario.email,
                username: usuario.username,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                rol: usuario.rol
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear usuario', error: error.message });
        }
    }

    // ACTUALIZAR USUARIO
    async update(req, res) {
        try {
            const { id } = req.params;
            const { password, ...userData } = req.body;
            // Verificar unicidad de email si se está actualizando
            if (userData.email) {
                const existingEmail = await this.service.findByEmail(userData.email);
                if (existingEmail && existingEmail.id !== parseInt(id)) {
                    return res.status(400).json({ message: 'Ya existe un usuario con este email' });
                }
            }
            // Verificar unicidad de username si se está actualizando
            if (userData.username) {
                const existingUsername = await this.service.findByUsername(userData.username);
                if (existingUsername && existingUsername.id !== parseInt(id)) {
                    return res.status(400).json({ message: 'Ya existe un usuario con este nombre de usuario' });
                }
            }
            if (password) {
                const salt = await bcrypt.genSalt(10);
                userData.password = await bcrypt.hash(password, salt);
            }
            const usuario = await this.service.update(id, userData);
            if (!usuario) {
                return res.status(404).json({ message: 'No se encontró el usuario' });
            }
            res.json({
                id: usuario.id,
                email: usuario.email,
                username: usuario.username,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                rol: usuario.rol
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
        }
    }

    // ELIMINAR USUARIO
    async delete(req, res) {
        try {
            const { id } = req.params;
            const usuario = await this.service.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ message: 'No se encontró el usuario' });
            }
            await this.service.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
        }
    }

    // OBTENER USUARIO AUTENTICADO (ME)
    async getMe(req, res) {
        try {
            // Suponiendo que el middleware de autenticación agrega req.user con el id del usuario autenticado
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'No autorizado' });
            }
            const usuario = await this.service.findByPk(userId);
            if (!usuario) {
                return res.status(404).json({ message: 'No se encontró el usuario autenticado' });
            }
            res.json({
                id: usuario.id,
                email: usuario.email,
                username: usuario.username,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                rol: usuario.rol
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuario autenticado', error: error.message });
        }
    }
}

module.exports = new UsuarioController();
