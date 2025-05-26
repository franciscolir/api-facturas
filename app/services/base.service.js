/**
 * Clase base para servicios que implementa operaciones CRUD básicas
 * Proporciona funcionalidad común para todos los servicios del sistema
 * Implementa el patrón de borrado lógico usando el campo 'activo'
 */
class BaseService {
    /**
     * Constructor del servicio base
     * @param {Model} model - Modelo de Sequelize a utilizar
     */
    constructor(model) {
        this.model = model;
    }

    /**
     * Obtiene todos los registros activos
     * Solo retorna registros donde activo = true
     * @returns {Promise<Array>} Lista de registros activos
     */
    async findAll() {
        return await this.model.findAll({
            where: {
                activo: true
            }
        });
    }

    /**
     * Busca un registro activo por su ID
     * Solo retorna el registro si existe y está activo
     * @param {number} id - ID del registro a buscar
     * @returns {Promise<Object|null>} Registro encontrado o null
     */
    async findById(id) {
        return await this.model.findOne({
            where: {
                id,
                activo: true
            }
        });
    }

    /**
     * Crea un nuevo registro
     * Automáticamente establece activo = true
     * @param {Object} data - Datos del nuevo registro
     * @returns {Promise<Object>} Registro creado
     */
    async create(data) {
        return await this.model.create({
            ...data,
            activo: true
        });
    }

    /**
     * Actualiza un registro existente
     * Solo actualiza registros que estén activos
     * @param {number} id - ID del registro a actualizar
     * @param {Object} data - Datos a actualizar
     * @returns {Promise<Object|null>} Registro actualizado o null si no existe
     */
    async update(id, data) {
        const item = await this.model.findOne({
            where: {
                id,
                activo: true
            }
        });
        if (item) {
            return await item.update(data);
        }
        return null;
    }

    /**
     * Realiza un borrado lógico del registro
     * En lugar de eliminar físicamente, establece activo = false
     * Solo puede "eliminar" registros que estén activos
     * @param {number} id - ID del registro a eliminar
     * @returns {Promise<boolean>} true si se eliminó, false si no existe
     */
    async delete(id) {
        const item = await this.model.findOne({
            where: {
                id,
                activo: true
            }
        });
        if (item) {
            await item.update({ activo: false });
            return true;
        }
        return false;
    }
}

module.exports = BaseService; 