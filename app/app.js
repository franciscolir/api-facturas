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

// Importar rutas
const clienteRoutes = require('./routes/cliente.routes');
const vendedorRoutes = require('./routes/vendedor.routes');
const productoRoutes = require('./routes/producto.routes');
const condicionPagoRoutes = require('./routes/condicion-pago.routes');
const facturaRoutes = require('./routes/factura.routes');
const folioRoutes = require('./routes/folio.routes');
const detalleFacturaRoutes = require('./routes/detalle-factura.routes');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();
app.disable('x-powered-by');
// Middleware para procesar JSON en las peticiones
app.use(express.json());

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
app.use('/api/clientes', clienteRoutes);
app.use('/api/vendedores', vendedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/condiciones-pago', condicionPagoRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/folios', folioRoutes);
app.use('/api/detalles-factura', detalleFacturaRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Configuración de la documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializar base de datos
initializeDatabase();

module.exports = app;
