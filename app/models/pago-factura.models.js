/**
 * Modelo de PagoFactura
 * Representa el estado de pago de una factura y su vencimiento.
 * Permite registrar y controlar los pagos asociados a facturas,
 * incluyendo la fecha de vencimiento, el estado del pago y las relaciones
 * con factura, cliente y condición de pago.
 */

module.exports = (sequelize, DataTypes) => {
    // Definición del modelo PagoFactura con sus campos y restricciones
    const PagoFactura = sequelize.define('PagoFactura', {
        // Identificador único autoincremental para cada pago de factura
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // ID de la factura asociada (relación obligatoria)
        factura_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'facturas',
                key: 'id'
            }
        },
        // Fecha de emisión de la factura asociada
        factura_fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        // ID de la condición de pago asociada a la factura (relación obligatoria)
        condicion_pago_id_facturas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'condiciones_pago',
                key: 'id'
            }
        },
        // ID del cliente asociado a la factura (relación obligatoria)
        cliente_id_facturas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clientes',
                key: 'id'
            }
        },
        // Fecha de vencimiento del pago
        vencimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        // Estado del pago: pendiente, pagada o vencida
        estado: {
            type: DataTypes.ENUM('pendiente', 'pagada', 'vencida'),
            allowNull: false,
            defaultValue: 'pendiente'
        },
        // Indica si el registro está activo (borrado lógico)
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        tableName: 'pagos_factura',
        timestamps: true,
        hooks: {
            // Hook que calcula la fecha de vencimiento antes de validar el registro
            beforeValidate: async (pagoFactura) => {
                // Si no se proporciona vencimiento, se calcula automáticamente
                if (!pagoFactura.vencimiento && pagoFactura.factura_fecha && pagoFactura.condicion_pago_id_facturas) {
                    // Busca la condición de pago para obtener los días de plazo
                    const CondicionPago = sequelize.models.CondicionesPago;
                    const condicion = await CondicionPago.findByPk(pagoFactura.condicion_pago_id_facturas);
                    if (!condicion || !condicion.dias_plazo) {
                        throw new Error('Condición de pago inválida');
                    }
                    // Calcula la fecha de vencimiento sumando los días de plazo a la fecha de la factura
                    const fecha = new Date(pagoFactura.factura_fecha);
                    fecha.setDate(fecha.getDate() + condicion.dias_plazo);
                    pagoFactura.vencimiento = fecha;
                }
            }
        }
    });

    // Definición de relaciones del modelo PagoFactura con otros modelos
    PagoFactura.associate = function(models) {
        // Relación: Un pago de factura pertenece a una factura
        PagoFactura.belongsTo(models.Factura, { foreignKey: 'factura_id' });
        // Relación: Un pago de factura pertenece a una condición de pago
        PagoFactura.belongsTo(models.CondicionesPago, { foreignKey: 'condicion_pago_id_facturas' });
        // Relación: Un pago de factura pertenece a un cliente
        PagoFactura.belongsTo(models.Cliente, { foreignKey: 'cliente_id_facturas' });
    };

            // Método de instancia para exponer solo los atributos públicos
    PagoFactura.prototype.toPublicJSON = function() {
        return {
            id: this.id,
            factura_id: this.factura_id,
            factura_fecha: this.factura_fecha,
            factura_total: this.Factura.total,// Asegúrate de que este campo exista en el modelo Factura
            condicion_pago_id_facturas: this.condicion_pago_id_facturas,
            cliente_id_facturas: this.cliente_id_facturas,
            vencimiento: this.vencimiento,
            estado: this.estado
            // agrega aquí otros campos públicos si lo necesitas
        };
    };
    return PagoFactura;
};