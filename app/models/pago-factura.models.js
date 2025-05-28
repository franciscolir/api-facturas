/**
 * Modelo de PagoFactura
 * Representa el estado de pago de una factura y su vencimiento
 */

module.exports = (sequelize, DataTypes) => {
    // Definición del modelo PagoFactura con sus campos y restricciones
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

    return PagoFactura;
};/**
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