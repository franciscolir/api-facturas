const BaseController = require('./base.controller');
const UsuarioService = require('../services/usuario.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuarioController extends BaseController {
    constructor() {
        super(UsuarioService);
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Email y password son requeridos'
                });
            }

            const usuario = await UsuarioService.findByEmail(email);
            if (!usuario) {
                return res.status(401).json({
                    message: 'Credenciales inválidas'
                });
            }

            const validPassword = await bcrypt.compare(password, usuario.password);
            if (!validPassword) {
                return res.status(401).json({
                    message: 'Credenciales inválidas'
                });
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
            res.status(500).json({
                message: 'Error al iniciar sesión',
                error: error.message
            });
        }
    }

    async getByEmail(req, res) {
        try {
            const { email } = req.params;
            const usuario = await UsuarioService.findByEmail(email);
            
            if (!usuario) {
                return res.status(404).json({
                    message: 'No se encontró el usuario con el email especificado'
                });
            }

            res.json(usuario);
        } catch (error) {
            console.error('Error al obtener usuario por email:', error);
            res.status(500).json({
                message: 'Error al obtener usuario por email',
                error: error.message
            });
        }
    }

    async getByUsername(req, res) {
        try {
            const { username } = req.params;
            const usuario = await UsuarioService.findByUsername(username);
            
            if (!usuario) {
                return res.status(404).json({
                    message: 'No se encontró el usuario con el nombre de usuario especificado'
                });
            }

            res.json(usuario);
        } catch (error) {
            console.error('Error al obtener usuario por username:', error);
            res.status(500).json({
                message: 'Error al obtener usuario por username',
                error: error.message
            });
        }
    }

    async create(req, res) {
        try {
            const { password, ...userData } = req.body;

            // Verificar si ya existe un usuario con el mismo email o username
            const existingEmail = await UsuarioService.findByEmail(userData.email);
            if (existingEmail) {
                return res.status(400).json({
                    message: 'Ya existe un usuario con este email'
                });
            }

            const existingUsername = await UsuarioService.findByUsername(userData.username);
            if (existingUsername) {
                return res.status(400).json({
                    message: 'Ya existe un usuario con este nombre de usuario'
                });
            }

            // Encriptar password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const usuario = await UsuarioService.create({
                ...userData,
                password: hashedPassword
            });

            res.status(201).json({
                id: usuario.id,
                email: usuario.email,
                username: usuario.username,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                rol: usuario.rol
            });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({
                message: 'Error al crear usuario',
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { password, ...userData } = req.body;

            // Si se está actualizando el email, verificar que no exista
            if (userData.email) {
                const existingEmail = await UsuarioService.findByEmail(userData.email);
                if (existingEmail && existingEmail.id !== parseInt(id)) {
                    return res.status(400).json({
                        message: 'Ya existe un usuario con este email'
                    });
                }
            }

            // Si se está actualizando el username, verificar que no exista
            if (userData.username) {
                const existingUsername = await UsuarioService.findByUsername(userData.username);
                if (existingUsername && existingUsername.id !== parseInt(id)) {
                    return res.status(400).json({
                        message: 'Ya existe un usuario con este nombre de usuario'
                    });
                }
            }

            // Si se está actualizando el password, encriptarlo
            if (password) {
                const salt = await bcrypt.genSalt(10);
                userData.password = await bcrypt.hash(password, salt);
            }

            const usuario = await UsuarioService.update(id, userData);
            
            if (!usuario) {
                return res.status(404).json({
                    message: 'No se encontró el usuario'
                });
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
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({
                message: 'Error al actualizar usuario',
                error: error.message
            });
        }
    }

    async getByRol(req, res) {
        try {
            const usuarios = await this.service.findByRol(req.params.rol);
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar usuarios por rol',
                error: error.message
            });
        }
    }

    async getActiveVendedores(req, res) {
        try {
            const vendedores = await this.service.getActiveVendedores();
            return res.status(200).json(vendedores);
        } catch (error) {
            return res.status(500).json({
                message: 'Error al buscar vendedores activos',
                error: error.message
            });
        }
    }

    async toggleActivo(req, res) {
        try {
            const usuario = await this.service.toggleActivo(req.params.id);
            if (usuario) {
                return res.status(200).json(usuario);
            }
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } catch (error) {
            return res.status(500).json({
                message: 'Error al cambiar estado del usuario',
                error: error.message
            });
        }
    }
}

module.exports = UsuarioController;
