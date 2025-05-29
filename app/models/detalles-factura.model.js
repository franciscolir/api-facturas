/**
 * Modelo de Detalles de Factura
 * Define la estructura y validaciones para los detalles de cada factura
 * Permite gestionar los productos y cantidades en cada factura
 * Calcula automáticamente los subtotales por línea
 * Mantiene la relación entre facturas y productos
 * 
 * Características principales:
 * - Registro detallado de productos por factura
 * - Control de cantidades y precios unitarios
 * - Cálculo automático de subtotales
 * - Relaciones con facturas y productos
 * - Auditoría de creación y modificación
 * - Todos los campos son requeridos para garantizar la integridad de los datos
 */
module.exports = (sequelize, DataTypes) => {
    const DetallesFactura = sequelize.define('detalles_factura', {
      // Identificador único autoincremental para cada detalle
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // ID de la factura a la que pertenece el detalle (requerido)
      factura_id: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // ID del producto incluido en el detalle (requerido)
      producto_id: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // Cantidad de unidades del producto (requerido)
      cantidad: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // Indica si el detalle está activo (borrado lógico, requerido)
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      // Precio por unidad del producto (requerido)
      precio_unitario: { 
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      // Subtotal calculado para esta línea (requerido)
      subtotal: { 
        type: DataTypes.DECIMAL,
        allowNull: false
      },
    }, {
      // Configuración de la tabla y comportamiento
      tableName: 'detalles_factura',
      timestamps: true, // Registra fecha de creación y actualización
      createdAt: 'created_at', // Nombre de la columna para fecha de creación
      updatedAt: 'updated_at'  // Nombre de la columna para fecha de actualización
    });
  
    return DetallesFactura;
  };
