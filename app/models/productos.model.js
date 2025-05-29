/**
 * Modelo de Productos
 * Define la estructura y validaciones para el catálogo de productos
 * Gestiona la información de productos y su inventario
 * Controla precios, stock y estado de los productos
 * Mantiene relaciones con detalles de factura
 * 
 * Características principales:
 * - Identificación única por código
 * - Control de precios unitarios
 * - Gestión de inventario (stock)
 * - Descripciones detalladas
 * - Control de estado (activo/inactivo)
 * - Auditoría de creación y modificación
 */
module.exports = (sequelize, DataTypes) => {
    const Productos = sequelize.define('productos', {
      // Identificador único autoincremental
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Código único del producto
      // Se usa como identificador principal en búsquedas
      // No se permite duplicados en el sistema
      // No puede ser nulo
      codigo: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      // Nombre del producto (requerido)
      // Se usa para identificación y búsqueda
      // Debe ser descriptivo y claro
      nombre: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      // Descripción detallada del producto
      // Puede incluir características, especificaciones
      // y otra información relevante
      descripcion: { type: DataTypes.TEXT },
      // Precio de venta unitario (requerido)
      // Se usa para calcular totales en facturas
      // Debe ser un valor positivo
      precio_unitario: { 
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      // Cantidad disponible en inventario (requerido)
      // Se actualiza con cada venta
      // Debe ser un número entero no negativo
      stock: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      // Estado del producto en el sistema
      // Permite desactivar productos sin eliminarlos
      // Útil para mantener historial
      // Por defecto todos los productos se crean activos
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      // Configuración de la tabla y comportamiento
      tableName: 'productos',
      timestamps: true, // Registra fecha de creación y actualización
      createdAt: 'created_at', // Nombre de la columna para fecha de creación
      updatedAt: 'updated_at'  // Nombre de la columna para fecha de actualización
    });
  
    return Productos;
  };
