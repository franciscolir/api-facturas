/**
 * Servicio para la gestión de Facturas
 * Extiende el servicio base e implementa funcionalidades específicas para facturas
 * Maneja relaciones con clientes, vendedores, condiciones de pago y detalles
 */
const BaseService = require('./base.service');
const { Factura, Cliente, Vendedor, CondicionPago, DetalleFactura, Producto } = require('../models');

const TASA_IVA = 0.19; // Puedes ajustar la tasa de IVA aquí

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
        const subtotal = detalles.reduce((sum, d) => sum + parseFloat(d.subtotal), 0);
        const iva = subtotal * TASA_IVA;
        const total = subtotal + iva;
        // Actualizar la cabecera de la factura
        await Factura.update(
            { subtotal, iva, total },
            { where: { id: facturaId } }
        );
    }

    /**
     * Crea una factura y recalcula los totales después de crear los detalles
     * @param {Object} data - Datos de la factura, incluyendo detalles
     * @returns {Promise<Object>} Factura creada con totales correctos
     */
    async createWithDetalles(data) {
        // Extraer detalles y datos de cabecera
        const { detalles, ...cabecera } = data;
        // Crear la factura (cabecera)
        const factura = await Factura.create(cabecera);
        // Crear los detalles asociados
        if (Array.isArray(detalles)) {
            for (const det of detalles) {
                // Calcular subtotal de cada detalle
                const subtotalDetalle = det.cantidad * det.precio_unitario;
                await DetalleFactura.create({
                    ...det,
                    factura_id: factura.id,
                    subtotal: subtotalDetalle
                });
            }
        }
        // Recalcular totales de la factura
        await this.recalcularTotales(factura.id);
        // Retornar la factura con los totales actualizados
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
    return await this.model.findAll({
        where: { estado: 'borrador', activo: true },
        include: [
            { model: Cliente },
            { model: Vendedor },
            { model: CondicionPago },
            { model: DetalleFactura }
        ]
    });
}




    /**
     * Obtiene todas las facturas con sus relaciones
     * Incluye información de cliente, vendedor, condición de pago y detalles
     * Los detalles incluyen información de productos
     * @returns {Promise<Array>} Lista de facturas con todas sus relaciones
     */
    async findAllWithDetails() {
        return await this.model.findAll({
            include: [
                { model: Cliente },
                { model: Vendedor },
                { model: CondicionPago },
                { 
                    model: DetalleFactura,
                    include: [{ model: Producto }]
                }
            ]
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
            where: { cliente_id: clienteId, activo: true },
            include: [
                { model: DetalleFactura, include: [{ model: Producto }] }
            ]
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
            where: { vendedor_id: vendedorId, activo: true },
            include: [
                { model: Cliente },
                { model: DetalleFactura, include: [{ model: Producto }] }
            ]
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
            where: { fecha, activo: true },
            include: [
                { model: Cliente },
                { model: Vendedor },
                { model: DetalleFactura, include: [{ model: Producto }] }
            ]
        });
    }

    /**
     * Obtiene una factura específica con todos sus detalles y relaciones
     * @param {number} id - ID de la factura a buscar
     * @returns {Promise<Object>} Factura con todas sus relaciones
     */
    async findByIdWithDetails(id) {
        return await this.model.findOne({
            where: { id, activo: true },
            include: [
                { model: Cliente },
                { model: Vendedor },
                { model: CondicionPago },
                { 
                    model: DetalleFactura,
                    include: [{ model: Producto }]
                }
            ]
        });
    }
}

module.exports = new FacturaService(); 