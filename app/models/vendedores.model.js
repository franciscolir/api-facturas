module.exports = (sequelize, DataTypes) => {
    const Vendedores = sequelize.define('vendedores', {
      nombre: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      telefono: { type: DataTypes.STRING },
    }, {
      tableName: 'vendedores',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return Vendedores;
  };
  