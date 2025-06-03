// Importa la instancia de Sequelize ya configurada y DataTypes
const sequelize = require('../../config/db'); // ✅ instancia de Sequelize ya configurada
const { DataTypes } = require('sequelize');

// =======================
// Cargar modelos
// =======================

// Importa y define cada modelo de la aplicación, pasando la instancia de sequelize y DataTypes
const Cliente = require('./clientes.model')(sequelize, DataTypes);
const Vendedor = require('./vendedores.model')(sequelize, DataTypes);
const Producto = require('./productos.model')(sequelize, DataTypes);
const CondicionPago = require('./condicion-pago.model')(sequelize, DataTypes);
const Factura = require('./facturas.models').default(sequelize, DataTypes);
const Folio = require('./folios.model')(sequelize, DataTypes);
const DetalleFactura = require('./detalles-factura.model')(sequelize, DataTypes);
const Usuario = require('./usuario.model')(sequelize, DataTypes);
const PagoFactura = require('./pago-factura.models.js')(sequelize, DataTypes); // <-- Agregado

// =======================
// Definir relaciones entre modelos
// =======================

// Relación Cliente-Factura: Un cliente puede tener muchas facturas
Cliente.hasMany(Factura, { foreignKey: 'cliente_id' });
Factura.belongsTo(Cliente, { foreignKey: 'cliente_id' });

// Relación Vendedor-Factura: Un vendedor puede tener muchas facturas
Vendedor.hasMany(Factura, { foreignKey: 'vendedor_id' });
Factura.belongsTo(Vendedor, { foreignKey: 'vendedor_id' });

// Relación CondicionPago-Factura: Una condición de pago puede estar en muchas facturas
CondicionPago.hasMany(Factura, { foreignKey: 'condicion_pago_id' });
Factura.belongsTo(CondicionPago, { foreignKey: 'condicion_pago_id' });

// Relación Factura-DetalleFactura: Una factura puede tener muchos detalles
Factura.hasMany(DetalleFactura, { foreignKey: 'factura_id' });
DetalleFactura.belongsTo(Factura, { foreignKey: 'factura_id' });

// Relación Producto-DetalleFactura: Un producto puede estar en muchos detalles de factura
Producto.hasMany(DetalleFactura, { foreignKey: 'producto_id' });
DetalleFactura.belongsTo(Producto, { foreignKey: 'producto_id' });

// Relación Factura-Folio: Una factura tiene un folio asociado (uno a uno)
Factura.hasOne(Folio, { foreignKey: 'id_factura' });
Folio.belongsTo(Factura, { foreignKey: 'id_factura' });

// =======================
// Relaciones para PagoFactura
// =======================

// Un cliente puede tener muchos pagos de factura
Cliente.hasMany(PagoFactura, { foreignKey: 'cliente_id_facturas' });
PagoFactura.belongsTo(Cliente, { foreignKey: 'cliente_id_facturas' });

// Una factura puede tener muchos pagos de factura
Factura.hasMany(PagoFactura, { foreignKey: 'factura_id' });
PagoFactura.belongsTo(Factura, { foreignKey: 'factura_id' });

// Una condición de pago puede tener muchos pagos de factura
CondicionPago.hasMany(PagoFactura, { foreignKey: 'condicion_pago_id_facturas' });
PagoFactura.belongsTo(CondicionPago, { foreignKey: 'condicion_pago_id_facturas' });

// =======================
// Exportar todos los modelos y la instancia de sequelize
// =======================
module.exports = {
  sequelize,
  Cliente,
  Vendedor,
  Producto,
  CondicionPago,
  Factura,
  Folio,
  DetalleFactura,
  Usuario,
  PagoFactura
};