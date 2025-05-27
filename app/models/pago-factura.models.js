/**
 * Modelo de PagoFactura
 * Representa el estado de pago de una factura y su vencimiento
 */

module.exports = (sequelize, DataTypes) => {
    const PagoFactura = sequelize.define('PagoFactura', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        factura_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'facturas',
                key: 'id'
            }
        },
        factura_fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        condicion_pago_id_facturas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'condiciones_pago',
                key: 'id'
            }
        },
        cliente_id_facturas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clientes',
                key: 'id'
            }
        },
        vencimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('pendiente', 'pagada', 'vencida'),
            allowNull: false,
            defaultValue: 'pendiente'
        }
    }, {
        tableName: 'pagos_factura',
        timestamps: true,
        hooks: {
            // Calcula el vencimiento antes de crear el registro
            beforeValidate: async (pagoFactura) => {
                if (!pagoFactura.vencimiento && pagoFactura.factura_fecha && pagoFactura.condicion_pago_id_facturas) {
                    const CondicionPago = sequelize.models.CondicionesPago;
                    const condicion = await CondicionPago.findByPk(pagoFactura.condicion_pago_id_facturas);
                    if (!condicion || !condicion.dias_plazo) {
                        throw new Error('Condición de pago inválida');
                    }
                    const fecha = new Date(pagoFactura.factura_fecha);
                    fecha.setDate(fecha.getDate() + condicion.dias_plazo);
                    pagoFactura.vencimiento = fecha;
                }
            }
        }
    });

    // Relaciones
    PagoFactura.associate = function(models) {
        PagoFactura.belongsTo(models.Factura, { foreignKey: 'factura_id' });
        PagoFactura.belongsTo(models.CondicionesPago, { foreignKey: 'condicion_pago_id_facturas' });
        PagoFactura.belongsTo(models.Cliente, { foreignKey: 'cliente_id_facturas' });
    };

    return PagoFactura;
};