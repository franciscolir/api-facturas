/**
 * Modelo de Factura
 * Define la estructura y validaciones para las facturas del sistema
 * Gestiona el proceso completo de facturación, desde borrador hasta emisión
 * Controla los totales, IVA y estados de las facturas
 * Mantiene relaciones con clientes, vendedores y condiciones de pago
 * 
 * Características principales:
 * - Control de estados (borrador, emitida, anulada)
 * - Cálculo automático de totales e IVA
 * - Asignación automática de folios
 * - Relaciones con clientes y vendedores
 * - Control de condiciones de pago
 * - Auditoría de creación y modificación
 */
module.exports = (sequelize, DataTypes) => {
    const Factura = sequelize.define('Factura', {
        // Identificador único autoincremental
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Fecha de emisión de la factura
        // Se establece automáticamente al crear
        // No puede ser nula
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        // Subtotal de la factura antes de IVA
        // Se calcula sumando los subtotales de los detalles
        // No puede ser negativo
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        // Monto del IVA calculado
        // Se calcula sobre el subtotal
        // No puede ser negativo
        iva: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        // Monto total de la factura
        // Resultado de subtotal + iva
        // No puede ser negativo
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },
        // Estado actual de la factura
        // borrador: en proceso de creación
        // emitida: factura finalizada y numerada
        // anulada: factura cancelada
        estado: {
            type: DataTypes.ENUM('borrador', 'emitida', 'anulada'),
            allowNull: false,
            defaultValue: 'borrador'
        },
        // Estado de activación de la factura
        // Permite desactivar facturas sin eliminarlas
        // Útil para mantener historial
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        // ID del cliente asociado a la factura
        // Relación obligatoria con la tabla clientes
        // No puede ser nulo
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clientes',
                key: 'id'
            }
        },
        // ID del vendedor que emite la factura
        // Relación obligatoria con la tabla vendedores
        // No puede ser nulo
        vendedor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'vendedores',
                key: 'id'
            }
        },
        // ID de la condición de pago
        // Relación obligatoria con la tabla condiciones_pago
        // Define plazos y términos de pago
        condicion_pago_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'condiciones_pago',
                key: 'id'
            }
        },
        // ID del folio asignado a la factura
        // Se asigna automáticamente al emitir
        // Debe ser único en el sistema
        folio_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'folios',
                key: 'id'
            },
            unique: true
        }
    }, {
        // Configuración de la tabla y comportamiento
        tableName: 'facturas',
        timestamps: true, // Registra fecha de creación y actualización
        hooks: {
            // Hook que se ejecuta antes de crear una factura
            // Ya no asigna folio automáticamente al crear
            // La factura se crea siempre como 'borrador' y sin folio asignado
            beforeCreate: async (factura) => {
                // Si la factura se crea, debe quedar como 'borrador' y sin folio
                factura.estado = 'borrador';
                factura.folio_id = null;
            }
        }
    });

    return Factura;
};
