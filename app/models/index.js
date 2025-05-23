//const { Sequelize, DataTypes } = require('sequelize');
//const config = require('../../config/db');

//const sequelize = new Sequelize(config);

const sequelize = require('../../config/db'); // ✅ instancia de Sequelize ya configurada
const { DataTypes } = require('sequelize');


// Cargar modelos
const Cliente = require('./clientes.model')(sequelize, DataTypes);
const Vendedor = require('./vendedores.model')(sequelize, DataTypes);
const Producto = require('./productos.model')(sequelize, DataTypes);
const CondicionPago = require('./condicion-pago.model')(sequelize, DataTypes);
const Factura = require('./facturas.models')(sequelize, DataTypes);
const Folio = require('./folios.model')(sequelize, DataTypes);
const DetalleFactura = require('./detalles-factura.model')(sequelize, DataTypes);
const Usuario = require('./usuario.model')(sequelize, DataTypes);

// Definir relaciones
Cliente.hasMany(Factura, { foreignKey: 'cliente_id' });
Factura.belongsTo(Cliente, { foreignKey: 'cliente_id' });

Vendedor.hasMany(Factura, { foreignKey: 'vendedor_id' });
Factura.belongsTo(Vendedor, { foreignKey: 'vendedor_id' });

CondicionPago.hasMany(Factura, { foreignKey: 'condicion_pago_id' });
Factura.belongsTo(CondicionPago, { foreignKey: 'condicion_pago_id' });

Factura.hasMany(DetalleFactura, { foreignKey: 'factura_id' });
DetalleFactura.belongsTo(Factura, { foreignKey: 'factura_id' });

Producto.hasMany(DetalleFactura, { foreignKey: 'producto_id' });
DetalleFactura.belongsTo(Producto, { foreignKey: 'producto_id' });

Factura.hasOne(Folio, { foreignKey: 'id_factura' });
Folio.belongsTo(Factura, { foreignKey: 'id_factura' });

// Exportar todos los modelos y la instancia de sequelize
module.exports = {
  sequelize,
  Cliente,
  Vendedor,
  Producto,
  CondicionPago,
  Factura,
  Folio,
  DetalleFactura,
  Usuario
}; 