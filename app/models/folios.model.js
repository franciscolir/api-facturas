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
        // Identificador único autoincremental
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Número secuencial del folio
        // Se genera automáticamente si no se especifica
        // Debe ser único en el sistema
        // No puede ser nulo
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        // Serie del folio (A, B, C, etc.)
        // Se usa para separar rangos de numeración
        // Por defecto es 'A'
        // No puede ser nulo
        serie: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'A'
        },
        // Tipo de folio (FACTURA, BOLETA, etc.)
        // Se usa para identificar el tipo de documento
        // No puede ser nulo
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'FACTURA'
        },
        // Estado actual del folio
        // disponible: listo para ser usado
        // usado: asignado a una factura
        // anulado: cancelado y no usable
        estado: {
            type: DataTypes.ENUM('disponible', 'usado', 'anulado'),
            allowNull: false,
            defaultValue: 'disponible'
        },
        // Estado de activación del folio (borrado lógico)
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        // Fecha en que el folio fue usado
        // Se registra al asignar a una factura
        // Puede ser nulo si el folio no se ha usado
        fecha_uso: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        // Configuración de la tabla y comportamiento
        tableName: 'folios',
        timestamps: true, // Registra fecha de creación y actualización
        indexes: [
            // Índice compuesto para búsquedas por tipo y serie
            {
                fields: ['tipo', 'serie']
            }
        ],
        hooks: {
            // Hook que se ejecuta antes de crear un folio
            // Genera automáticamente el siguiente número
            // Si no se especifica un número
            beforeCreate: async (folio) => {
                if (!folio.numero) {
                    // Obtener el último número de folio del mismo tipo y serie
                    const ultimoFolio = await Folio.findOne({
                        where: {
                            tipo: folio.tipo,
                            serie: folio.serie
                        },
                        order: [['numero', 'DESC']]
                    });
                    folio.numero = ultimoFolio ? ultimoFolio.numero + 1 : 1;
                }
            }
        }
    });

    return Folio;
};
  