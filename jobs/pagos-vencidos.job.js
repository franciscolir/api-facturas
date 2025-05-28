// Importa la librería node-cron para programar tareas automáticas
const cron = require('node-cron');
// Importa el servicio de pagos de factura
const pagoFacturaService = require('../app/services/pago-factura.service');

// Programa una tarea que se ejecuta todos los días a las 00:10 AM
cron.schedule('10 0 * * *', async () => {
    try {
        // Llama al método que marca automáticamente los pagos vencidos
        const cantidad = await pagoFacturaService.marcarPagosVencidosAutomaticamente();
        // Muestra en consola cuántos pagos fueron marcados como vencidos
        console.log(`[Pagos vencidos] ${cantidad} pagos marcados como vencidos (${new Date().toISOString()})`);
    } catch (error) {
        // Si ocurre un error, lo muestra en consola
        console.error('[Pagos vencidos] Error:', error);
    }
});