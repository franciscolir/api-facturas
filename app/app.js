/**
 * Aplicación principal de la API de Facturas
 * Configura y maneja la aplicación Express, incluyendo middleware, rutas y conexión a la base de datos
 * 
 * Características principales:
 * - Configuración de Express y middleware
 * - Integración con Sequelize para la base de datos
 * - Documentación Swagger/OpenAPI
 * - Manejo centralizado de errores
 * - Rutas para todos los módulos de la aplicación
 * 
 * @module app
 */
const express = require('express');
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');

// Importar rutas
const clienteRoutes = require('./routes/cliente.routes');
const vendedorRoutes = require('./routes/vendedor.routes');
const productoRoutes = require('./routes/producto.routes');
const condicionPagoRoutes = require('./routes/condicion-pago.routes');
const facturaRoutes = require('./routes/factura.routes');
const folioRoutes = require('./routes/folio.routes');
const detalleFacturaRoutes = require('./routes/detalle-factura.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const pagoFacturaRoutes = require('./routes/pago-factura.routes'); // <-- Agrega esta línea

const app = express();
app.disable('x-powered-by');
// Middleware para procesar JSON en las peticiones
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

/**
 * Middleware para el manejo centralizado de errores
 * Captura cualquier error no manejado en la aplicación
 * 
 * @param {Error} err - Error capturado
 * @param {Request} req - Objeto de petición Express
 * @param {Response} res - Objeto de respuesta Express
 * @param {NextFunction} next - Función para pasar al siguiente middleware
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

/**
 * Inicializa la conexión a la base de datos y sincroniza los modelos
 * En desarrollo, altera las tablas existentes para reflejar cambios en los modelos
 * 
 * @async
 * @function initializeDatabase
 * @throws {Error} Si hay un error al sincronizar la base de datos
 */
async function initializeDatabase() {
    try {
        await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        console.log('Base de datos sincronizada correctamente');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
        process.exit(1);
    }
}

// Configuración de rutas de la API
// Cada línea asocia un grupo de rutas (módulo) con un prefijo de URL.
// Esto permite organizar y acceder a los recursos de la API de forma estructurada.
app.use('/api/clientes', clienteRoutes); // Rutas para gestión de clientes
app.use('/api/vendedores', vendedorRoutes); // Rutas para gestión de vendedores
app.use('/api/productos', productoRoutes); // Rutas para gestión de productos
app.use('/api/condiciones-pago', condicionPagoRoutes); // Rutas para condiciones de pago
app.use('/api/facturas', facturaRoutes); // Rutas para facturación
app.use('/api/folios', folioRoutes); // Rutas para folios de documentos
app.use('/api/detalles-factura', detalleFacturaRoutes); // Rutas para detalles de factura
app.use('/api/usuarios', usuarioRoutes); // Rutas para usuarios del sistema
app.use('/api/pagos-factura', pagoFacturaRoutes); // Rutas para pagos de factura (estados, vencimientos, etc.)

// Configuración de la documentación Swagger
// Expone la documentación interactiva de la API en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializar base de datos
// Sincroniza los modelos Sequelize con la base de datos al iniciar la aplicación
initializeDatabase();

module.exports = app;
