module.exports = (sequelize, DataTypes) => {
    const Vendedores = sequelize.define('vendedores', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: { type: DataTypes.STRING },
      email: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      telefono: { type: DataTypes.STRING },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      tableName: 'vendedores',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return Vendedores;
  };
  