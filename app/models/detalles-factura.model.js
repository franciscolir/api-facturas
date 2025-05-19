module.exports = (sequelize, DataTypes) => {
    const DetallesFactura = sequelize.define('detalles_factura', {
      factura_id: { type: DataTypes.INTEGER },
      producto_id: { type: DataTypes.INTEGER },
      cantidad: { type: DataTypes.INTEGER },
      precio_unitario: { type: DataTypes.DECIMAL },
      subtotal: { type: DataTypes.DECIMAL },
    }, {
      tableName: 'detalles_factura',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return DetallesFactura;
  };
  