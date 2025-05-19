module.exports = (sequelize, DataTypes) => {
    const CondicionesPago = sequelize.define('condiciones_pago', {
      codigo: { type: DataTypes.STRING },
      descripcion: { type: DataTypes.STRING },
      dias_venc: { type: DataTypes.INTEGER },
    }, {
      tableName: 'condiciones_pago',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    });
  
    return CondicionesPago;
  };
  