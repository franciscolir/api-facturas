module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('clientes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rut: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
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
  