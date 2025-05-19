const express = require('express');
const { sequelize } = require('./models');

// Importar rutas
const userRoutes = require('./routes/user.routes');
const clienteRoutes = require('./routes/cliente.routes');
const vendedorRoutes = require('./routes/vendedor.routes');
const productoRoutes = require('./routes/producto.routes');
const condicionPagoRoutes = require('./routes/condicion-pago.routes');
const facturaRoutes = require('./routes/factura.routes');
const folioRoutes = require('./routes/folio.routes');
const detalleFacturaRoutes = require('./routes/detalle-factura.routes');

const app = express();

// Middleware
app.use(express.json());

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Conectar a la base de datos y sincronizar modelos
async function initializeDatabase() {
    try {
        await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
        console.log('Base de datos sincronizada correctamente');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
        process.exit(1);
    }
}

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/vendedores', vendedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/condiciones-pago', condicionPagoRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/folios', folioRoutes);
app.use('/api/detalles-factura', detalleFacturaRoutes);

// Inicializar base de datos
initializeDatabase();

module.exports = app;