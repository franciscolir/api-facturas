module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('clientes', {
      rut: { type: DataTypes.STRING },
      razon_social: { type: DataTypes.STRING },
      direccion: { type: DataTypes.STRING },
      comuna: { type: DataTypes.STRING },
      ciudad: { type: DataTypes.STRING },
      giro: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      telefono: { type: DataTypes.STRING },
    }, {
      tableName: 'clientes',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return Clientes;
  };
  