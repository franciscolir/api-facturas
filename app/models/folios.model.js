/**
 * Modelo de Folio
 * Define la estructura y validaciones para los folios de facturación
 * Gestiona la numeración secuencial de facturas
 * Controla el estado y asignación de folios
 * Mantiene un registro histórico de uso
 * 
 * Características principales:
 * - Numeración automática secuencial
 * - Control de series (A, B, C, etc.)
 * - Estados de folio (disponible, usado, anulado)
 * - Registro de fecha de uso
 * - Asignación automática a facturas
 * - Auditoría de creación y modificación
 */
module.exports = (sequelize, DataTypes) => {
    const Folio = sequelize.define('Folio', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true // Aún se espera que sea único
        },
        serie: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'A'
        },        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'FACTURA'
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'disponible',
            validate: {
                isIn: [['disponible', 'usado', 'anulado']]
            }
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        fecha_uso: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'folios',
        timestamps: true,
        indexes: [
        
            {
                fields: ['estado'] // Para filtrar por estado más rápido
            }
        ]
    });

    // Método para salida pública
    Folio.prototype.toPublicJSON = function () {
        return {
            id: this.id,
            numero: this.numero,
            serie: this.serie,
            tipo: this.tipo,
            estado: this.estado,
            fecha_uso: this.fecha_uso
        };
    };

    return Folio;
};
