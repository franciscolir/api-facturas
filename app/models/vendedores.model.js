/**
 * Modelo de Vendedores
 * Define la estructura y validaciones para los vendedores del sistema
 * Gestiona la información de contacto y estado de los vendedores
 * Mantiene relaciones con las facturas emitidas
 * Controla el estado activo/inactivo de los vendedores
 * 
 * Características principales:
 * - Identificación única por email
 * - Datos de contacto completos
 * - Control de estado (activo/inactivo)
 * - Relación con facturas emitidas
 * - Auditoría de creación y modificación
 */
module.exports = (sequelize, DataTypes) => {
    const Vendedores = sequelize.define('vendedores', {
      // Identificador único autoincremental
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Nombre completo del vendedor
      // Se usa para identificación y búsqueda
      // Debe incluir nombre y apellidos
      nombre: { type: DataTypes.STRING },
      // Email de contacto del vendedor
      // Se usa como identificador único
      // Debe tener formato válido
      // No puede ser nulo
      // No se permite duplicados
      email: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      // Teléfono de contacto del vendedor
      // Formato: +56 9 1234 5678
      // Se usa para comunicación directa
      // Campo opcional pero recomendado
      telefono: { type: DataTypes.STRING },
      // Estado del vendedor en el sistema
      // Permite desactivar vendedores sin eliminarlos
      // Útil para mantener historial
      // Por defecto todos los vendedores se crean activos
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      // Configuración de la tabla y comportamiento
      tableName: 'vendedores',
      timestamps: true, // Registra fecha de creación y actualización
      createdAt: 'created_at', // Nombre de la columna para fecha de creación
      updatedAt: 'updated_at'  // Nombre de la columna para fecha de actualización
    });
     Vendedores.prototype.toPublicJSON = function() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono
           };
    };
    return Vendedores;
  };
  