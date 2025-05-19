module.exports = (sequelize, DataTypes) => {
    const Folio = sequelize.define('Folio', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        serie: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'A'
        },
        estado: {
            type: DataTypes.ENUM('disponible', 'usado', 'anulado'),
            allowNull: false,
            defaultValue: 'disponible'
        },
        fecha_uso: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'folios',
        timestamps: true,
        hooks: {
            beforeCreate: async (folio) => {
                if (!folio.numero) {
                    // Obtener el último número de folio
                    const ultimoFolio = await Folio.findOne({
                        order: [['numero', 'DESC']]
                    });
                    folio.numero = ultimoFolio ? ultimoFolio.numero + 1 : 1;
                }
            }
        }
    });

    return Folio;
};
  