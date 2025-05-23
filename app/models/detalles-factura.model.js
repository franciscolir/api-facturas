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
 */
module.exports = (sequelize, DataTypes) => {
    const DetallesFactura = sequelize.define('detalles_factura', {
      // Identificador único autoincremental
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // ID de la factura a la que pertenece el detalle
      // Relación con la tabla facturas
      // Campo obligatorio para asociar el detalle a una factura
      factura_id: { type: DataTypes.INTEGER },
      // ID del producto incluido en el detalle
      // Relación con la tabla productos
      // Campo obligatorio para identificar el producto
      producto_id: { type: DataTypes.INTEGER },
      // Cantidad de unidades del producto
      // Debe ser un número entero positivo
      // Se usa para calcular el subtotal
      cantidad: { type: DataTypes.INTEGER },
      // Precio por unidad del producto
      // Se almacena al momento de crear la factura
      // Permite mantener histórico de precios
      precio_unitario: { type: DataTypes.DECIMAL },
      // Subtotal calculado para esta línea
      // Resultado de cantidad * precio_unitario
      // Se usa para totalizar la factura
      subtotal: { type: DataTypes.DECIMAL },
    }, {
      // Configuración de la tabla y comportamiento
      tableName: 'detalles_factura',
      timestamps: true, // Registra fecha de creación y actualización
      createdAt: 'created_at', // Nombre de la columna para fecha de creación
      updatedAt: 'updated_at'  // Nombre de la columna para fecha de actualización
    });
  
    return DetallesFactura;
  };
  