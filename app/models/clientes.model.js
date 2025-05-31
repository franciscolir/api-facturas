/**
 * Modelo de Clientes
 * Define la estructura y validaciones para los clientes del sistema
 * Permite gestionar información de clientes y sus facturas
 * Incluye validaciones de RUT y datos de contacto
 * Mantiene un registro histórico de las transacciones por cliente
 * 
 * Características principales:
 * - Identificación única por RUT
 * - Datos de contacto y ubicación completos
 * - Información de giro comercial
 * - Control de estado (activo/inactivo)
 * - Historial de facturas asociadas
 */
module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('clientes', {
      // Identificador único autoincremental
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // RUT del cliente para identificación única
      // Formato: 12345678-9
      // Se usa como identificador principal en búsquedas
      // No se permite duplicados en el sistema
      rut: { 
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      // Nombre o razón social del cliente
      // Se usa para identificación y facturación
      // Puede ser nombre de persona o empresa
      razon_social: { type: DataTypes.STRING },
      // Dirección física del cliente
      // Incluye calle y número
      direccion: { type: DataTypes.STRING },
      // Comuna donde se ubica el cliente
      // Se usa para envío de documentos y correspondencia
      comuna: { type: DataTypes.STRING },
      // Ciudad donde se ubica el cliente
      // Se usa para envío de documentos y correspondencia
      ciudad: { type: DataTypes.STRING },
      // Giro comercial del cliente
      // Describe la actividad económica principal
      giro: { type: DataTypes.STRING },
      // Email de contacto del cliente
      // Se usa para envío de facturas electrónicas
      // Debe tener formato válido si se proporciona
      email: { type: DataTypes.STRING },
      // Teléfono de contacto del cliente
      // Formato: +56 9 1234 5678
      // Se usa para comunicación directa
      telefono: { type: DataTypes.STRING },
      // Estado del cliente en el sistema
      // Permite desactivar clientes sin eliminarlos
      // Útil para mantener historial de clientes inactivos
      // Por defecto todos los clientes se crean activos
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      // Configuración de la tabla y comportamiento
      tableName: 'clientes',
      timestamps: true, // Registra fecha de creación y actualización
      createdAt: 'created_at', // Nombre de la columna para fecha de creación
      updatedAt: 'updated_at'  // Nombre de la columna para fecha de actualización
    });
            // Método de instancia para exponer solo los atributos públicos
    Clientes.prototype.toPublicJSON = function() {
        return {
            id: this.id,
            rut: this.rut,
            razon_social: this.razon_social,
            direccion: this.direccion,
            comuna: this.comuna,
            giro: this.giro,
            telefono: this.telefono,
            email: this.email
        };
    };
  
    return Clientes;
  };
  