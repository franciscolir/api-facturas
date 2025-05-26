// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api-facturacion',
      version: '1.0.0',
      description: 'Api para la facturacion de ventas',
    },
    components: {
      schemas: {
        Cliente: {
          type: 'object',
          required: ['rut', 'razon_social'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'ID único del cliente'
            },
            rut: {
              type: 'string',
              example: '12345678-9',
              description: 'RUT del cliente'
            },
            razon_social: {
              type: 'string',
              example: 'Empresa XYZ Ltda.',
              description: 'Razón social o nombre del cliente'
            },
            direccion: {
              type: 'string',
              example: 'Av. Principal 123',
              description: 'Dirección del cliente'
            },
            comuna: {
              type: 'string',
              example: 'Santiago',
              description: 'Comuna del cliente'
            },
            ciudad: {
              type: 'string',
              example: 'Santiago',
              description: 'Ciudad del cliente'
            },
            giro: {
              type: 'string',
              example: 'Comercio',
              description: 'Giro del negocio'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'contacto@empresa.com',
              description: 'Email de contacto'
            },
            telefono: {
              type: 'string',
              example: '+56912345678',
              description: 'Teléfono de contacto'
            },
            activo: {
              type: 'boolean',
              example: true,
              description: 'Estado del cliente'
            }
          }
        },
        Factura: {
          type: 'object',
          required: ['cliente_id', 'vendedor_id', 'fecha', 'total'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'ID único de la factura'
            },
            cliente_id: {
              type: 'integer',
              example: 1,
              description: 'ID del cliente'
            },
            vendedor_id: {
              type: 'integer',
              example: 1,
              description: 'ID del vendedor'
            },
            fecha: {
              type: 'string',
              format: 'date',
              example: '2024-03-20',
              description: 'Fecha de emisión'
            },
            total: {
              type: 'number',
              format: 'float',
              example: 150000.00,
              description: 'Total de la factura'
            },
            condicion_pago_id: {
              type: 'integer',
              example: 1,
              description: 'ID de la condición de pago'
            },
            activo: {
              type: 'boolean',
              example: true,
              description: 'Estado de la factura'
            }
          }
        },
        Producto: {
          type: 'object',
          required: ['codigo', 'nombre', 'precio'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'ID único del producto'
            },
            codigo: {
              type: 'string',
              example: 'PROD001',
              description: 'Código único del producto'
            },
            nombre: {
              type: 'string',
              example: 'Producto XYZ',
              description: 'Nombre del producto'
            },
            descripcion: {
              type: 'string',
              example: 'Descripción detallada del producto',
              description: 'Descripción del producto'
            },
            precio: {
              type: 'number',
              format: 'float',
              example: 1000.00,
              description: 'Precio del producto'
            },
            stock: {
              type: 'integer',
              example: 100,
              description: 'Cantidad en stock'
            },
            categoria: {
              type: 'string',
              example: 'Electrónicos',
              description: 'Categoría del producto'
            },
            activo: {
              type: 'boolean',
              example: true,
              description: 'Estado del producto'
            }
          }
        },
        Vendedor: {
          type: 'object',
          required: ['codigo', 'nombre', 'email'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'ID único del vendedor'
            },
            codigo: {
              type: 'string',
              example: 'VEND001',
              description: 'Código único del vendedor'
            },
            nombre: {
              type: 'string',
              example: 'Juan Pérez',
              description: 'Nombre del vendedor'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'juan@empresa.com',
              description: 'Email del vendedor'
            },
            telefono: {
              type: 'string',
              example: '+56987654321',
              description: 'Teléfono del vendedor'
            },
            activo: {
              type: 'boolean',
              example: true,
              description: 'Estado del vendedor'
            }
          }
        },
        Folio: {
          type: 'object',
          required: ['numero', 'tipo'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'ID único del folio'
            },
            numero: {
              type: 'integer',
              example: 1001,
              description: 'Número del folio'
            },
            tipo: {
              type: 'string',
              example: 'FACTURA',
              description: 'Tipo de documento'
            },
            usado: {
              type: 'boolean',
              example: false,
              description: 'Estado del folio'
            },
            fecha_uso: {
              type: 'string',
              format: 'date-time',
              example: '2024-03-20T10:00:00Z',
              description: 'Fecha de uso del folio'
            },
            id_factura: {
              type: 'integer',
              example: 1,
              description: 'ID de la factura asociada'
            }
          }
        },
        CondicionPago: {
          type: 'object',
          required: ['codigo', 'descripcion', 'plazo'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'ID único de la condición de pago'
            },
            codigo: {
              type: 'string',
              example: 'CONTADO',
              description: 'Código de la condición'
            },
            descripcion: {
              type: 'string',
              example: 'Pago al contado',
              description: 'Descripción de la condición'
            },
            plazo: {
              type: 'integer',
              example: 0,
              description: 'Plazo en días'
            },
            activo: {
              type: 'boolean',
              example: true,
              description: 'Estado de la condición'
            }
          }
        },
        Usuario: {
          type: 'object',
          required: ['email', 'password', 'rol'],
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'ID único del usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'usuario@empresa.com',
              description: 'Email del usuario'
            },
            password: {
              type: 'string',
              example: '********',
              description: 'Contraseña encriptada'
            },
            rol: {
              type: 'string',
              enum: ['admin', 'vendedor', 'usuario'],
              example: 'vendedor',
              description: 'Rol del usuario'
            },
            activo: {
              type: 'boolean',
              example: true,
              description: 'Estado del usuario'
            }
          }
        },
        DetallesFacturas: {
          type: 'object',
          required: ['factura_id', 'producto_id', 'cantidad', 'precio_unitario', 'total'],
          properties: {
            factura_id: {
              type: 'integer',
              example: 1001,
              description: 'ID de la factura a la que pertenece este detalle'
            },
            producto_id: {
              type: 'integer',
              example: 501,
              description: 'ID del producto incluido en la factura'
            },
            cantidad: {
              type: 'integer',
              example: 3,
              description: 'Cantidad de unidades del producto'
            },
            precio_unitario: {
              type: 'number',
              format: 'float',
              example: 2500.75,
              description: 'Precio unitario del producto'
            },
            total: {
              type: 'number',
              format: 'float',
              example: 7502.25,
              description: 'Total del detalle (cantidad x precio unitario)'
            }
          }
        }
      }
    },

    tags: [
      {
        name: 'Clientes',
        description: 'Operaciones relacionadas con clientes. CRUD.'
      },
      {
        name: 'Condiciones de Pago',
        description: 'Búsqueda de condiciones de pago. CRUD.'
      },
      {
        name: 'Facturas',
        description: 'Emisión, consulta y gestión de facturas. CRUD.'
      },
      {
        name: 'Detalles de Factura',
        description: 'Items de cada factura (productos, cantidad, precio). CRUD.'
      },
      {
        name: 'Productos',
        description: 'Administración de productos y stock. CRUD.'
      },
      {
        name: 'Folios',
        description: 'Control de folios disponibles y usados. CRUD.'
      }, 
      {
        name: 'Vendedores',
        description: 'Operaciones relacionadas con vendedores. CRUD.'
      },
      {
        name: 'Usuarios',
        description: 'Registro y administración de usuarios. CRUD.'
      }   
    ],

   //  servers: [{ url }],
  },
  apis: ['./app/routes/*.js'],
};

module.exports = swaggerJSDoc(options);
