/**
 * Servicio para la gestión de Folios
 * Extiende BaseService e implementa lógica específica para folios.
 * Permite la administración de folios para facturación electrónica y su asignación a facturas.
 */
const BaseService = require('./base.service');
const { Folio } = require('../models');
const { Op } = require('sequelize');

 //const { sequelize } = require('../config/db');
class FolioService extends BaseService {
    /**
     * Inicializa el servicio con el modelo de Folio
     */
    constructor() {
        super(Folio);
    }

    /**
     * Sobreescribe el método findAll del BaseService
     * para no usar el campo activo que no existe en Folio
     * @returns {Promise<Array>} Lista de folios
     */
    async findAll() {
        return await this.model.findAll({
            order: [['numero', 'ASC']]
        });
    }

    /**
     * Sobreescribe el método findByPk del BaseService
     * para no usar el campo activo que no existe en Folio
     * @param {number} id - ID del folio a buscar
     * @returns {Promise<Object|null>} Folio encontrado o null
     */
    async findByPk(id) {
        return await this.model.findByPk(id);
    }

    /**
     * Crea múltiples folios a partir de un array
     * Valida unicidad de numero, tipo y serie para cada folio
     * @param {Array<Object>} folios - Array de folios a crear
     * @returns {Promise<Array>} Folios creados
     * @throws {Error} Si algún folio ya existe
     */
    async createMany(folios) {
        const foliosCreados = [];
        for (const data of folios) {
            const existingFolio = await this.model.findOne({
                where: {
                    numero: data.numero,
                    tipo: data.tipo,
                    serie: data.serie
                }
            });
            if (existingFolio) {
                throw new Error(`Ya existe un folio con el número: ${data.numero}, tipo: ${data.tipo}, serie: ${data.serie}`);
            }
            const folio = await super.create(data);
            foliosCreados.push(folio);
        }
        return foliosCreados;
    }

    // Métodos específicos para Folio



async findNextAvailable() {
    try {
        const disponibles = await this.model.findAll({
            where: {
                estado: {
                    [Op.eq]: sequelize.where(
                        sequelize.fn('LOWER', sequelize.col('estado')),
                        'disponible'
                    )
                }
            },
            order: [['numero', 'ASC']]
        });

        console.log('Folios encontrados:', disponibles);

        return disponibles.length > 0 ? disponibles[0] : null;

    } catch (error) {
        console.error('Error buscando folios:', error.message);
        throw error;
    }
}


    async create(data) {
        // Si no se especifica el tipo, usar el valor por defecto
        if (!data.tipo) {
            data.tipo = 'FACTURA';
        }

        // Verificar si ya existe un folio con el mismo número, tipo y serie
        const existingFolio = await this.model.findOne({
            where: {
                numero: data.numero,
                tipo: data.tipo,
                serie: data.serie
            }
        });

        if (existingFolio) {
            throw new Error('Ya existe un folio con este número, tipo y serie');
        }

        return await super.create(data);
    }

    async update(id, data) {
        // Si se está actualizando el número, tipo o serie, verificar que no exista
        if (data.numero || data.tipo || data.serie) {
            const existingFolio = await this.model.findOne({
                where: {
                    numero: data.numero || this.model.numero,
                    tipo: data.tipo || this.model.tipo,
                    serie: data.serie || this.model.serie,
                    id: { [Op.ne]: id }
                }
            });

            if (existingFolio) {
                throw new Error('Ya existe un folio con este número, tipo y serie');
            }
        }

        return await super.update(id, data);
    }

    /**
     * Marca un folio como usado y asigna la fecha de uso
     * @param {number} id - ID del folio a actualizar
     * @returns {Promise<Object|null>} Folio actualizado o null si no existe
     */
    async markAsUsed(id) {
        const folio = await this.model.findByPk(id);
        if (folio) {
            return await folio.update({ estado: 'usado', fecha_uso: new Date() });
        }
        return null;
    }

    async markAsAnulado(id) {
        const folio = await this.findByPk(id);
        if (!folio) {
            throw new Error('Folio no encontrado');
        }

        if (folio.estado === 'anulado') {
            throw new Error('El folio ya está anulado');
        }

        return await this.update(id, {
            estado: 'anulado'
        });
    }

    /**
     * Busca todos los folios asignados a una factura específica
     * @param {number} facturaId - ID de la factura
     * @returns {Promise<Array>} Lista de folios asignados
     */
    async findByFacturaId(facturaId) {
        return await this.model.findAll({ where: { id_factura: facturaId } });
    }
}

module.exports = new FolioService(); 