module.exports = (sequelize, DataTypes) => {
    const Productos = sequelize.define('productos', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigo: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
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
  