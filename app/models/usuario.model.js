/**
 * Modelo de Usuario
 * Define la estructura y validaciones para los usuarios del sistema
 * Permite gestionar usuarios con diferentes roles y permisos
 * Incluye autenticación y control de acceso
 */
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Nombre real del usuario
        // Se usa para identificación personal
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Email del usuario para login y comunicación
        // Debe ser único y tener formato válido
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // Contraseña encriptada para seguridad
        // Se almacena con hash bcrypt
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Rol del usuario en el sistema
        // Define permisos y acceso a funcionalidades
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'usuario',
            validate: {
                isIn: [['usuario', 'admin']]
            }
        },
        // Estado del usuario en el sistema
        // Permite activar/desactivar usuarios sin eliminarlos
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        // Configuración de la tabla y comportamiento
        tableName: 'usuarios',
        timestamps: true // Registra fecha de creación y actualización
    });

        // Método de instancia para exponer solo los atributos públicos
    Usuario.prototype.toPublicJSON = function() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            rol: this.rol
            // agrega aquí otros campos públicos si lo necesitas
        };
    };


    return Usuario;
};

