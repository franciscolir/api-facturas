const BaseService = require('./base.service');
const { Folio } = require('../models');
const { Op } = require('sequelize');

class FolioService extends BaseService {
    constructor() {
        super(Folio);
    }

    // Métodos específicos para Folio
    async findByTipo(tipo) {
        return await this.model.findAll({ 
            where: { tipo },
            order: [['numero', 'ASC']]
        });
    }

    async findByTipoAndSerie(tipo, serie) {
        return await this.model.findAll({ 
            where: { 
                tipo,
                serie
            },
            order: [['numero', 'ASC']]
        });
    }

    async findNextAvailable(tipo, serie) {
        return await this.model.findOne({
            where: {
                tipo,
                serie,
                estado: 'disponible'
            },
            order: [['numero', 'ASC']]
        });
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

    async markAsUsed(id) {
        const folio = await this.findById(id);
        if (!folio) {
            throw new Error('Folio no encontrado');
        }

        if (folio.estado !== 'disponible') {
            throw new Error('El folio no está disponible para uso');
        }

        return await this.update(id, {
            estado: 'usado',
            fecha_uso: new Date()
        });
    }

    async markAsAnulado(id) {
        const folio = await this.findById(id);
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
}

module.exports = new FolioService(); 