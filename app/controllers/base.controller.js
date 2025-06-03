/**
 * Controlador Base
 * Proporciona la funcionalidad CRUD básica para todos los controladores
 * Maneja las operaciones comunes de listar, crear, actualizar y eliminar
 * Implementa el manejo de errores estándar
 * 
 * Características principales:
 * - Operaciones CRUD completas
 * - Manejo de errores consistente
 * - Respuestas HTTP estandarizadas
 * - Integración con servicios
 */
class BaseController {
    /**
     * Constructor del controlador base
     * @param {Object} service - Servicio que maneja la lógica de negocio
     */
    constructor(service) {
        this.service = service;
    }

    /**
     * Obtiene todos los registros
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Array} Lista de registros
     */
    async getAll(req, res) {
        console.log('getAll', req.url);
        console.log('getAll', req.method);
        try {
            const items = await this.service.findAll();
            //res.json(items);
            
            res.json(items.map(u => u.toPublicJSON()));
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Obtiene un registro por su ID
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Registro encontrado
     */
    async getByPk(req, res) {
        try {
            const item = await this.service.findByPk(req.params.id);
            if (item) {
                //res.json(item);
                res.json(item ? item.toPublicJSON() : {});
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Crea un nuevo registro
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Registro creado
     */
    async create(req, res) {
        try {
            const item = await this.service.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Actualiza un registro existente
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {Object} Registro actualizado
     */
    async update(req, res) {
        try {
            const item = await this.service.update(req.params.id, req.body);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    /**
     * Elimina un registro
     * @param {Object} req - Objeto de solicitud HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * @returns {void}
     */
    async delete(req, res) {
        try {
            const success = await this.service.delete(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = BaseController; 