/**
 * Servicio para la gestión de Productos
 * Extiende el servicio base e implementa funcionalidades específicas para productos
 * Maneja validaciones de código único y gestión de inventario
 */
const BaseService = require('./base.service');
const { Producto } = require('../models');

class ProductoService extends BaseService {
    constructor() {
        super(Producto);
    }

    /**
     * Busca un producto por su código único
     * @param {string} codigo - Código único del producto
     * @returns {Promise<Object|null>} Producto encontrado o null
     */
    async findByCodigo(codigo) {
        return await this.model.findOne({ where: { codigo } });
    }

    /**
     * Busca productos por categoría
     * @param {string} categoria - Categoría de productos a buscar
     * @returns {Promise<Array>} Lista de productos de la categoría
     */
    async findByCategoria(categoria) {
        return await this.model.findAll({ where: { categoria } });
    }

    /**
     * Crea un nuevo producto verificando que el código sea único
     * @param {Object} data - Datos del nuevo producto
     * @throws {Error} Si ya existe un producto con el mismo código
     * @returns {Promise<Object>} Producto creado
     */
    async create(data) {
        // Verificar si ya existe un producto con el mismo código
        const existingProducto = await this.findByCodigo(data.codigo);
        if (existingProducto) {
            throw new Error('Ya existe un producto con este código');
        }
        return await super.create(data);
    }

    /**
     * Crea múltiples productos a partir de un array
     * Valida unicidad de código para cada producto
     * @param {Array<Object>} productos - Array de productos a crear
     * @returns {Promise<Array>} Productos creados
     * @throws {Error} Si algún código ya existe
     */
    async createMany(productos) {
        const productosCreados = [];
        for (const data of productos) {
            const existingProducto = await this.findByCodigo(data.codigo);
            if (existingProducto) {
                throw new Error(`Ya existe un producto con el código: ${data.codigo}`);
            }
            const producto = await super.create(data);
            productosCreados.push(producto);
        }
        return productosCreados;
    }

    /**
     * Actualiza un producto verificando que el código sea único
     * @param {number} id - ID del producto a actualizar
     * @param {Object} data - Datos a actualizar
     * @throws {Error} Si el nuevo código ya existe en otro producto
     * @returns {Promise<Object|null>} Producto actualizado o null
     */
    async update(id, data) {
        // Si se está actualizando el código, verificar que no exista
        if (data.codigo) {
            const existingProducto = await this.findByCodigo(data.codigo);
            if (existingProducto && existingProducto.id !== id) {
                throw new Error('Ya existe un producto con este código');
            }
        }
        return await super.update(id, data);
    }
}

module.exports = new ProductoService(); 