/**
 * Modelo de CondicionPago
 * Define la estructura y validaciones para las condiciones de pago
 * Permite gestionar las diferentes formas de pago disponibles
 * Incluye plazos y descripciones para cada condición
 */
module.exports = (sequelize, DataTypes) => {
    const CondicionPago = sequelize.define('CondicionPago', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Código único de la condición de pago
        // Se usa para identificación y búsqueda rápida
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // Descripción detallada de la condición
        // Incluye términos y condiciones específicas
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        // Plazo en días para el pago
        // 0 = contado, >0 = días de plazo
        plazo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },
        // Estado de la condición en el sistema
        // Permite desactivar condiciones sin eliminarlas
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        // Configuración de la tabla y comportamiento
        tableName: 'condiciones_pago',
        timestamps: true, // Registra fecha de creación y actualización
        paranoid: true, // No elimina registros, solo los marca como eliminados
        indexes: [
            // Optimiza búsquedas por código
            {
                unique: true,
                fields: ['codigo']
            }
        ]
    });

    // Define relaciones con otros modelos
    CondicionPago.associate = (models) => {
        // Una condición de pago puede estar en muchas facturas
        // Relación uno a muchos con Factura
        CondicionPago.hasMany(models.Factura, {
            foreignKey: 'condicion_pago_id',
            as: 'facturas'
        });
    };

            // Método de instancia para exponer solo los atributos públicos
    CondicionPago.prototype.toPublicJSON = function() {
        return {
            id: this.id,
            codigo: this.codigo,
            descripcion: this.descripcion,
            plazo: this.plazo,
    
            // agrega aquí otros campos públicos si lo necesitas
        };
    };
    return CondicionPago;
};
  