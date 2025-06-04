/**
 * Servicio para la gestión de Facturas
 * Extiende el servicio base e implementa funcionalidades específicas para facturas
 * Maneja relaciones con clientes, vendedores, condiciones de pago y detalles
 */
const BaseService = require('./base.service');
const { Factura, Cliente, Vendedor, CondicionPago, DetalleFactura, Producto } = require('../models');

const TASA_IVA = 0.19; // Puedes ajustar la tasa de IVA aquí
const facturaFields = ['fecha', 'total', 'subtotal', 'iva', 'folio_id', 'estado'];

const facturaIncludes = [
    {
        model: Cliente,
        attributes: ['rut', 'razon_social', 'direccion', 'giro']
    },
    {
        model: Vendedor,
        attributes: ['nombre']
    },
    {
        model: CondicionPago,
        attributes: ['descripcion']
    },
    {
        model: DetalleFactura,
        attributes: ['cantidad', 'precio_unitario', 'subtotal'],
        include: [
            {
                model: Producto,
                attributes: ['nombre', 'codigo']
            }
        ]
    }
];

const facturaAttributes = {
    attributes: facturaFields,
    include: facturaIncludes
};

class FacturaService extends BaseService {
    /**
     * Inicializa el servicio con el modelo de Factura
     */
    constructor() {
        super(Factura);
    }

    /**
     * Recalcula y actualiza los totales de la factura (subtotal, iva, total)
     * sumando los subtotales de los detalles relacionados.
     * @param {number} facturaId - ID de la factura a recalcular
     */
    async recalcularTotales(facturaId) {
        // Obtener todos los detalles de la factura
        const detalles = await DetalleFactura.findAll({ where: { factura_id: facturaId } });
        // Calcular subtotal sumando los subtotales de los detalles
        const subtotal = detalles.reduce((sum, d) => sum + parseFloat(d.subtotal || 0), 0);
        const iva = subtotal * TASA_IVA;
        const total = subtotal + iva;
        // Actualizar la cabecera de la factura
        await Factura.update(
            { subtotal: subtotal.toFixed(2), iva: iva.toFixed(2), total: total.toFixed(2) },
            { where: { id: facturaId } }
        );
        // Log para depuración
        const facturaActualizada = await Factura.findByPk(facturaId);
        console.log('Totales actualizados:', facturaActualizada.subtotal, facturaActualizada.iva, facturaActualizada.total);
    }

        /**
     * Crea una factura junto con sus detalles asociados.
     * Para cada detalle, obtiene el precio_unitario actual del producto correspondiente,
     * lo almacena en el detalle (como decimal, no como referencia), y calcula el subtotal.
     * Finalmente, recalcula los totales de la factura (subtotal, iva, total) y retorna
     * la factura creada con todos sus detalles.
     *
     * @param {Object} data - Objeto con los datos de la factura y un array de detalles.
     *   data = {
     *     cliente_id,
     *     vendedor_id,
     *     condicion_pago_id,
     *     ...otrosCamposFactura,
     *     detalles: [
     *       { producto_id, cantidad, ...otrosCamposDetalle }
     *     ]
     *   }
     * @returns {Promise<Object>} Factura creada con detalles y totales correctos.
     * @throws {Error} Si algún producto no existe.
     */
    async createWithDetalles(data) {
        // Validación de datos de entrada
        const { detalles, cliente_id, vendedor_id, condicion_pago_id, fecha, ...cabecera } = data;

        // Validar campos obligatorios de cabecera
        if (!cliente_id || !vendedor_id || !condicion_pago_id) {
            throw new Error('Faltan campos obligatorios en la cabecera: cliente_id, vendedor_id o condicion_pago_id');
        }
        // Validar detalles
        if (!Array.isArray(detalles) || detalles.length === 0) {
            throw new Error('Debe incluir al menos un detalle en la factura');
        }

        // Validar cada detalle
        for (const [i, det] of detalles.entries()) {
            if (!det.producto_id) {
                throw new Error(`El detalle #${i + 1} no tiene producto_id`);
            }
            if (typeof det.cantidad !== 'number' || det.cantidad <= 0) {
                throw new Error(`El detalle #${i + 1} debe tener una cantidad mayor a 0`);
            }
        }

        // Crea la cabecera de la factura en la base de datos
        const factura = await Factura.create({
            cliente_id,
            vendedor_id,
            condicion_pago_id,
            fecha,
            ...cabecera
        });

        // Procesa cada detalle
        for (const det of detalles) {
            // Busca el producto por su ID para obtener el precio_unitario actual
            const producto = await Producto.findByPk(det.producto_id);
            if (!producto) {
                throw new Error(`Producto con id ${det.producto_id} no encontrado`);
            }
            // Obtiene el precio_unitario actual y lo asegura como decimal compatible con la base de datos
            // Usar string para DECIMAL en SQLite y la mayoría de los motores
            const precioUnitarioActual = producto.precio_unitario !== null
                ? producto.precio_unitario.toString()
                : "0.00";
            // Calcula el subtotal del detalle (cantidad * precio_unitario)
            const subtotalDetalle = (parseFloat(det.cantidad) * parseFloat(precioUnitarioActual)).toFixed(2);

            // Crea el detalle de factura, almacenando el precio_unitario actual y el subtotal como string decimal
            await DetalleFactura.create({
                factura_id: factura.id,
                producto_id: det.producto_id,
                cantidad: det.cantidad,
                precio_unitario: parseFloat(precioUnitarioActual).toFixed(2), // string decimal
                subtotal: subtotalDetalle // string decimal
            });
        }

        // Recalcula los totales de la factura (subtotal, iva, total)
        await this.recalcularTotales(factura.id);

        // Retorna la factura creada, incluyendo todos sus detalles
        return await Factura.findByPk(factura.id, { include: [DetalleFactura] });
    }

    /**
     * Llama a recalcularTotales después de agregar, actualizar o eliminar detalles
     * Puedes llamar a este método desde el controlador o desde hooks de detalles
     */
    async actualizarTotalesSiDetallesCambiaron(facturaId) {
        await this.recalcularTotales(facturaId);
    }

/**
 * Asigna folios disponibles a todas las facturas en estado borrador.
 * Cambia el estado de cada factura a 'emitida' y guarda el número de folio.
 * @returns {Promise<Array>} Lista de facturas actualizadas
 */
async asignarFoliosABorradores() {
    const { Folio } = require('../models');
    // Obtiene todas las facturas en estado borrador y activas
    const borradores = await this.model.findAll({
        where: { estado: 'borrador', activo: true }
    });

    const facturasActualizadas = [];

    for (const factura of borradores) {
        // Busca un folio disponible
        const folio = await Folio.findOne({ where: { usado: false, tipo: 'FACTURA' } });
        if (!folio) break; // Si no hay más folios, detiene el proceso

        // Asigna el folio a la factura y marca el folio como usado
        folio.usado = true;
        folio.id_factura = factura.id;
        await folio.save();

        factura.estado = 'emitida';
        factura.folio = folio.numero;
        await factura.save();

        facturasActualizadas.push(factura);
    }

    return facturasActualizadas;
}

/**
 * Obtiene todas las facturas en estado borrador
 * @returns {Promise<Array>} Lista de facturas en estado borrador
 */
async findBorrador() {
    const borradores = await this.model.findAll({
        ...facturaAttributes,
        //...facturaFields,
        where: { estado: 'borrador', activo: true }
    });
    console.log('Borradores encontrados:', borradores.length);
    return borradores;
}


    /**
     * Obtiene todas las facturas con sus relaciones
     * Incluye información de cliente, vendedor, condición de pago y detalles
     * Los detalles incluyen información de productos
     * @returns {Promise<Array>} Lista de facturas con todas sus relaciones
     */
    async findAllWithDetails() {
        console.log('findAllWithDetails');
    return await this.model.findAll({
        ...facturaAttributes,
        where: { activo: true }
    });
}


    /**
     * Busca facturas por ID de cliente
     * Incluye los detalles de la factura y productos asociados
     * @param {number} clienteId - ID del cliente a buscar
     * @returns {Promise<Array>} Facturas del cliente con sus detalles
     */
    async findByClienteId(clienteId) {
        return await this.model.findAll({
            ...facturaAttributes,
            where: { cliente_id: clienteId, activo: true }
        });
    }

    /**
     * Busca facturas por ID de vendedor
     * Incluye información del cliente y detalles de productos
     * @param {number} vendedorId - ID del vendedor a buscar
     * @returns {Promise<Array>} Facturas del vendedor con sus relaciones
     */
    async findByVendedorId(vendedorId) {
        return await this.model.findAll({
            ...facturaAttributes,
            where: { vendedor_id: vendedorId, activo: true }
        });
    }

    /**
     * Busca facturas por fecha de emisión
     * Incluye información completa de cliente, vendedor y detalles
     * @param {Date} fecha - Fecha de emisión a buscar
     * @returns {Promise<Array>} Facturas emitidas en la fecha especificada
     */
    async findByFecha(fecha) {
        return await this.model.findAll({
            ...facturaAttributes,
            where: { fecha, activo: true }
            
        });
    }

    /**
     * Obtiene una factura específica con todos sus detalles y relaciones
     * @param {number} id - ID de la factura a buscar
     * @returns {Promise<Object>} Factura con todas sus relaciones
     */
 async findByPkWithDetails(id) {
    return await this.model.findOne({
        ...facturaAttributes,
        where: { id, activo: true }
    });
}

}

module.exports = new FacturaService();