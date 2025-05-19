module.exports = (sequelize, DataTypes) => {
    const Productos = sequelize.define('productos', {
      codigo: { type: DataTypes.STRING },
      nombre: { type: DataTypes.STRING },
      descripcion: { type: DataTypes.TEXT },
      precio_unitario: { type: DataTypes.DECIMAL },
      stock: { type: DataTypes.INTEGER },
    }, {
      tableName: 'productos',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return Productos;
  };
  