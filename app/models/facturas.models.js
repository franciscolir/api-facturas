module.exports = (sequelize, DataTypes) => {
    const Factura = sequelize.define('Factura', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        iva: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        estado: {
            type: DataTypes.ENUM('borrador', 'emitida', 'anulada'),
            allowNull: false,
            defaultValue: 'borrador'
        },
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clientes',
                key: 'id'
            }
        },
        vendedor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'vendedores',
                key: 'id'
            }
        },
        condicion_pago_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'condiciones_pago',
                key: 'id'
            }
        },
        folio_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'folios',
                key: 'id'
            },
            unique: true
        }
    }, {
        tableName: 'facturas',
        timestamps: true,
        hooks: {
            beforeCreate: async (factura) => {
                if (factura.estado === 'emitida' && !factura.folio_id) {
                    const Folio = sequelize.models.Folio;
                    const folio = await Folio.findOne({
                        where: { estado: 'disponible' },
                        order: [['numero', 'ASC']]
                    });
                    
                    if (!folio) {
                        throw new Error('No hay folios disponibles');
                    }

                    await folio.update({
                        estado: 'usado',
                        fecha_uso: new Date()
                    });

                    factura.folio_id = folio.id;
                }
            }
        }
    });

    return Factura;
};
  