/**
 * Controlador de Usuarios
 * Gestiona las operaciones relacionadas con los usuarios del sistema
 * Extiende el controlador base para operaciones CRUD
 * Implementa métodos específicos para autenticación y gestión de usuarios
 * 
 * Características principales:
 * - Operaciones CRUD heredadas del controlador base
 * - Autenticación de usuarios con JWT
 * - Búsqueda de usuarios por email, username y rol
 * - Gestión de contraseñas encriptadas
 * - Manejo de errores consistente
 * - Respuestas HTTP estandarizadas
 */
const BaseController = require('./base.controller');
const UsuarioService = require('../services/usuario.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuarioController extends BaseController {
    /**
     * Constructor del controlador de usuarios
     * Inicializa el controlador con el servicio correspondiente
     */
    constructor() {
        super(UsuarioService);
    }

    /**
     * Autentica a un usuario y genera un token JWT
     * @param {Object} req - Objeto de solicitud HTTP con email y password
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Token JWT y datos del usuario
     * 
     * @example
     * POST /api/usuarios/login
     * Body: { "email": "usuario@ejemplo.com", "password": "contraseña" }
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validar que se proporcionen las credenciales
            if (!email || !password) {
                return res.status(400).json({
                    message: 'Email y password son requeridos'
                });
            }

            // Buscar usuario por email
            const usuario = await UsuarioService.findByEmail(email);
            if (!usuario) {
                return res.status(401).json({
                    message: 'Credenciales inválidas'
                });
            }

            // Verificar contraseña
            const validPassword = await bcrypt.compare(password, usuario.password);
            if (!validPassword) {
                return res.status(401).json({
                    message: 'Credenciales inválidas'
                });
            }

            // Generar token JWT
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            // Retornar token y datos del usuario (sin password)
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

    /**
     * Busca un usuario por su email
     * @param {Object} req - Objeto de solicitud HTTP con email en params
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Usuario encontrado
     * 
     * @example
     * GET /api/usuarios/email/usuario@ejemplo.com
     */
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

    /**
     * Busca un usuario por su nombre de usuario
     * @param {Object} req - Objeto de solicitud HTTP con username en params
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Usuario encontrado
     * 
     * @example
     * GET /api/usuarios/username/johndoe
     */
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

    /**
     * Registra un nuevo usuario y genera un token JWT
     * @param {Object} req - Objeto de solicitud HTTP con datos del usuario
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Token JWT y datos del usuario creado
     * 
     * @example
     * POST /api/usuarios/register
     * Body: { "email": "usuario@ejemplo.com", "password": "contraseña", ... }
     */
    async register(req, res) {
        try {
            const { password, ...userData } = req.body;

            // Verificar unicidad de email y username
            const existingEmail = await this.service.findByEmail(userData.email);
            if (existingEmail) {
                return res.status(400).json({
                    message: 'Ya existe un usuario con este email'
                });
            }

            if (userData.username) {
                const existingUsername = await this.service.findByUsername(userData.username);
                if (existingUsername) {
                    return res.status(400).json({
                        message: 'Ya existe un usuario con este nombre de usuario'
                    });
                }
            }

            // Encriptar password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Crear usuario
            const usuario = await this.service.create({
                ...userData,
                password: hashedPassword
            });

            // Generar token JWT
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            // Retornar token y datos del usuario (sin password)
            res.status(201).json({
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
            console.error('Error en registro:', error);
            res.status(500).json({
                message: 'Error al registrar usuario',
                error: error.message
            });
        }
    }

    /**
     * Actualiza un usuario existente
     * @param {Object} req - Objeto de solicitud HTTP con id en params y datos a actualizar
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Usuario actualizado
     * 
     * @example
     * PUT /api/usuarios/123
     * Body: { "nombre": "John", "apellido": "Doe", "email": "nuevo@ejemplo.com" }
     */
    async update(req, res) {
        try {
            const { id } = req.params;
            const { password, ...userData } = req.body;

            // Verificar unicidad de email si se está actualizando
            if (userData.email) {
                const existingEmail = await UsuarioService.findByEmail(userData.email);
                if (existingEmail && existingEmail.id !== parseInt(id)) {
                    return res.status(400).json({
                        message: 'Ya existe un usuario con este email'
                    });
                }
            }

            // Verificar unicidad de username si se está actualizando
            if (userData.username) {
                const existingUsername = await UsuarioService.findByUsername(userData.username);
                if (existingUsername && existingUsername.id !== parseInt(id)) {
                    return res.status(400).json({
                        message: 'Ya existe un usuario con este nombre de usuario'
                    });
                }
            }

            // Encriptar password si se está actualizando
            if (password) {
                const salt = await bcrypt.genSalt(10);
                userData.password = await bcrypt.hash(password, salt);
            }

            // Actualizar usuario
            const usuario = await UsuarioService.update(id, userData);
            
            if (!usuario) {
                return res.status(404).json({
                    message: 'No se encontró el usuario'
                });
            }

            // Retornar usuario actualizado (sin password)
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

    /**
     * Busca usuarios por rol
     * @param {Object} req - Objeto de solicitud HTTP con rol en params
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de usuarios con el rol especificado
     * 
     * @example
     * GET /api/usuarios/rol/vendedor
     */
    async getByRol(req, res) {
        try {
            const usuarios = await this.service.findByRol(req.params.rol);
            return res.status(200).json(usuarios);
        } catch (error) {
            console.error('Error al obtener usuarios por rol:', error);
            res.status(500).json({
                message: 'Error al obtener usuarios por rol',
                error: error.message
            });
        }
    }

    /**
     * Obtiene la lista de vendedores activos
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de vendedores activos
     * 
     * @example
     * GET /api/usuarios/vendedores/activos
     */
    async getActiveVendedores(req, res) {
        try {
            const vendedores = await this.service.findActiveVendedores();
            return res.status(200).json(vendedores);
        } catch (error) {
            console.error('Error al obtener vendedores activos:', error);
            res.status(500).json({
                message: 'Error al obtener vendedores activos',
                error: error.message
            });
        }
    }

    /**
     * Activa o desactiva un usuario
     * @param {Object} req - Objeto de solicitud HTTP con id en params
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Usuario actualizado
     * 
     * @example
     * PATCH /api/usuarios/123/toggle-activo
     */
    async toggleActivo(req, res) {
        try {
            const { id } = req.params;
            const usuario = await this.service.toggleActivo(id);
            
            if (!usuario) {
                return res.status(404).json({
                    message: 'No se encontró el usuario'
                });
            }

            res.json(usuario);
        } catch (error) {
            console.error('Error al cambiar estado del usuario:', error);
            res.status(500).json({
                message: 'Error al cambiar estado del usuario',
                error: error.message
            });
        }
    }
}

module.exports = new UsuarioController();
