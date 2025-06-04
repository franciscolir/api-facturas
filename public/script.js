// Configuración de endpoints por modelo
let facturaIndex = 0;// Índice actual de la factura mostrada.
let facturasArray = [];//Almacena un conjunto de facturas para navegación tipo paginación.
let currentModel = 'usuario';      // Modelo actualmente seleccionado
let lastResult = null;             // Último resultado devuelto por una API
let currentPage = 1;               // Página actual para paginación
let formMode = null;              // 'form' o 'json'
let currentVerb = null;           // Método HTTP actual
let currentEndpointIdx = null;    // Índice del endpoint actualmente seleccionado

        const apiBase = '/api';//Ruta base para todas las solicitudes fetch.
        /*-Estructura que define todas las rutas disponibles por tipo de entidad (usuario, producto, etc.), organizadas por método HTTP (GET, POST, etc.).
          -Cada endpoint contiene un name, path y params (JSON de ejemplo).*/
        const endpoints = {
            usuario: {
                GET: [
                    { name: 'Obtener todos', path: '/usuarios', params: '' },
                    { name: 'Obtener por ID', path: '/usuarios/{id}', params: '{ "id": 2 }' },
                    { name: 'Mi usuario', path: '/usuarios/me', params: '' }
                ],
                POST: [
                    { name: 'Crear usuario', path: '/usuarios', params: '{ "nombre": "Ejemplo", "email": "ejemplo@mail.com", "password": "123456", "rol": "usuario" }' },
                    { name: 'Login', path: '/usuarios/login', params: '{ "email": "ejemplo@mail.com", "password": "123456" }' }
                ],
                PUT: [
                    { name: 'Actualizar usuario', path: '/usuarios/{id}', params: '{ "id": 3 }' }
                ],
                DELETE: [
                    { name: 'Eliminar usuario', path: '/usuarios/{id}', params: '{ "id": 1 }' }
                ]
            },
            producto: {
                GET: [
                    { name: 'Obtener todos', path: '/productos', params: '' },
                    { name: 'Obtener por ID', path: '/productos/{id}', params: '{ "id": 20 }' },
                    { name: 'Obtener por código', path: '/productos/codigo/{codigo}', params: '{ "codigo": "PROD001" }' }
                ],
                POST: [
                    { name: 'Crear producto', path: '/productos', params: '{ "codigo": "PROD001", "nombre": "Producto", "precio_unitario": 100, "stock": 10 }' },
                    { name: 'Crear múltiples productos', path: '/productos/bulk', params: '[{ "codigo": "P002", "nombre": "Producto 2", "precio_unitario": 200, "stock": 20 }]' }
                ],
                PUT: [
                    { name: 'Actualizar producto', path: '/productos/{id}', params: '{ "nombre": "Nuevo Producto" }' }
                ],
                DELETE: [
                    { name: 'Eliminar producto', path: '/productos/{id}', params: '{ "id": 1 }' }
                ]
            },
            vendedor: {
                GET: [
                    { name: 'Obtener todos', path: '/vendedores', params: '' },
                    { name: 'Obtener por ID', path: '/vendedores/{id}', params: '{ "id": 2 }' },
                    { name: 'Obtener por nombre', path: '/vendedores/nombre/{nombre}', params: '{ "nombre": "nombre o apellido" }' }
                ],
                POST: [
                    { name: 'Crear vendedor', path: '/vendedores', params: '{ "nombre": "Vendedor", "email": "vendedor@mail.com", "telefono": "912345678" }' },
                    { name: 'Crear múltiples vendedores', path: '/vendedores/bulk', params: '[{ "nombre": "Vendedor 2", "email": "v2@mail.com", "telefono": "912345679" }]' }
                ],
                PUT: [
                    { name: 'Actualizar vendedor', path: '/vendedores/{id}', params: '{ "nombre": "Nuevo Vendedor" }' }
                ],
                DELETE: [
                    { name: 'Eliminar vendedor', path: '/vendedores/{id}', params: '{ "id": 4 }' }
                ]
            },
            folios: {
                GET: [
                    { name: 'Obtener todos', path: '/folios', params: '' },
                    { name: 'Obtener por ID', path: '/folios/{id}', params: '{ "id": 1 }' },
                    { name: 'Obtener siguiente disponible', path: '/folios/siguiente', params: '' }
                ],
                POST: [
                    { name: 'Crear folio', path: '/folios', params: '{ "numero": 123456, "serie": "A", "tipo": "FACTURA" }' },
                    { name: 'Crear múltiples folios', path: '/folios/bulk', params: '[{ "numero": 123457, "serie": "A", "tipo": "FACTURA" }]' }
                ],
                PUT: [
                    { name: 'Actualizar folio', path: '/folios/{id}', params: '{ "estado": "usado" }' },
                    { name: 'Usar folio', path: '/folios/{id}/usar', params: '{ "id": 1 }' },
                    { name: 'Anular folio', path: '/folios/{id}/anular', params: '{ "id": 1 }' }
                ],
                DELETE: [
                    { name: 'Eliminar folio', path: '/folios/{id}', params: '{ "id": 1 }' }
                ]
            },
            condicion_pago: {
                GET: [
                    { name: 'Obtener todos', path: '/condiciones-pago', params: '' },
                    { name: 'Obtener por ID', path: '/condiciones-pago/{id}', params: '{ "id": 3 }' },
                    { name: 'Obtener por código', path: '/condiciones-pago/codigo/{codigo}', params: '{ "codigo": "30D" }' },
                    { name: 'Obtener por plazo', path: '/condiciones-pago/plazo/{plazo}', params: '{ "plazo": 30 }' }
                ],
                POST: [
                    { name: 'Crear condición', path: '/condiciones-pago', params: '{ "codigo": "CONTADO", "descripcion": "Pago al contado", "plazo": 0 }' },
                    { name: 'Crear múltiples condiciones', path: '/condiciones-pago/bulk', params: '[{ "codigo": "CREDITO", "descripcion": "Pago a crédito", "plazo": 30 }]' }
                ],
                PUT: [
                    { name: 'Actualizar condición', path: '/condiciones-pago/{id}', params: '{ "descripcion": "Pago inmediato" }' }
                ],
                DELETE: [
                    { name: 'Eliminar condición', path: '/condiciones-pago/{id}', params: '{ "id": 1 }' }
                ]
            },
            clientes: {
                GET: [
                    { name: 'Obtener todos', path: '/clientes', params: '' },
                    { name: 'Obtener por ID', path: '/clientes/{id}', params: '{ "id": 7 }' },
                    { name: 'Obtener por RUT', path: '/clientes/rut/{rut}', params: '{ "rut": "12345678-9" }' }
                ],
                POST: [
                    { name: 'Crear cliente', path: '/clientes', params: '{ "rut": "12345678-9", "razon_social": "Empresa", "direccion": "Calle 123", "comuna": "Comuna", "ciudad": "Ciudad", "giro": "Comercio", "email": "cliente@mail.com", "telefono": "912345678" }' },
                    { name: 'Crear múltiples clientes', path: '/clientes/bulk', params: '[{ "rut": "98765432-1", "razon_social": "Empresa 2", "direccion": "Calle 456", "comuna": "Comuna", "ciudad": "Ciudad", "giro": "Servicios", "email": "cliente2@mail.com", "telefono": "912345679" }]' }
                ],
                PUT: [
                    { name: 'Actualizar cliente', path: '/clientes/{id}', params: '{ "razon_social": "Nuevo Nombre" }' }
                ],
                DELETE: [
                    { name: 'Eliminar cliente', path: '/clientes/{id}', params: '{ "id": 2 }' }
                ]
            },
            factura: {
                GET: [
                    { name: 'Obtener todas', path: '/facturas/with-details', params: '' },
                    { name: 'Obtener por ID', path: '/facturas/{id}/with-details', params: '{ "id": 5 }' },
                    { name: 'Obtener por cliente', path: '/facturas/cliente/{clienteId}', params: '{ "clienteId": 1 }' },
                    { name: 'Obtener por vendedor', path: '/facturas/vendedor/{vendedorId}', params: '{ "vendedorId": 1 }' },
                    { name: 'Obtener por fecha', path: '/facturas/fecha/{fecha}', params: '{ "fecha": "2025-05-26" }' },
                    { name: 'Obtener borrador', path: '/facturas/borrador', params: '' }
                ],
                POST: [
                    { name: 'Crear factura', path: '/facturas', params: '{ "cliente_id": 1, "vendedor_id": 1, "condicion_pago_id": 1, "detalles": [ { "producto_id": 1, "cantidad": 2, "precio_unitario": 100 } ] }' },
                    { name: 'Crear múltiples facturas', path: '/facturas/bulk', params: '[{ "cliente_id": 1, "vendedor_id": 1, "condicion_pago_id": 1, "detalles": [ { "producto_id": 1, "cantidad": 2, "precio_unitario": 100 } ] }]' }
                ],
                PUT: [
                    { name: 'Actualizar factura', path: '/facturas/{id}', params: '{ "estado": "emitida" }' }
                ],
                PATCH: [
                    { name: 'Asignar folios a borrador', path: '/facturas/asignar-folios-borrador', params: '' }
                ],
                DELETE: [
                    { name: 'Eliminar factura', path: '/facturas/{id}', params: '{ "id": 3 }' }
                ]
            }
        };


//Renderiza la lista de modelos (usuario, producto, etc.) como botones.
       function renderModelList() {
    const models = Object.keys(endpoints);    const listHtml = models.map(model =>
        `<button class="list-group-item list-group-item-action${model === currentModel ? ' active' : ''}" onclick="selectModel('${model}')">${capitalize(model.replaceAll('_', ' '))}</button>`
    ).join('');

    document.getElementById('modelList').innerHTML = `<div class="list-group">${listHtml}</div>`;
    document.getElementById('modelListMobile').innerHTML = listHtml;
}

        //Convierte la primera letra de un string en mayúscula.
        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // Selecciona un modelo y actualiza la UI
        //Actualiza el modelo actual y redibuja endpoints y resultados.
        function selectModel(model) {
            currentModel = model;
            // Limpiar arrays de facturas bulk al cambiar de modelo
            window.facturasBulkArray = [];
            window.detallesFacturas = [[]];
            window.facturaBulkIndex = 0;
            renderModelList();
            renderEndpoints();
            clearResults();
        }

        //Recorre todos los métodos HTTP.
        //Para cada endpoint, crea un botón con su nombre y permite ingresar parámetros si es necesario (por ejemplo {id}).
        //Asigna la función a ejecutar al hacer clic (por ejemplo, callEndpoint).
        function renderEndpoints() {
            ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].forEach(verb => {
                const container = document.getElementById(verb.toLowerCase() + 'Endpoints');
                if (!container) return;
                container.innerHTML = '';
                (endpoints[currentModel]?.[verb] || []).forEach((ep, idx) => {
                    const needsParams = ep.path.match(/{(\w+)}/g);
                    let paramPlaceholder = '';
                    let paramId = `${verb}_${currentModel}_${idx}_param`;
                    let btnDisabled = false;

                    if ((verb === 'GET' || verb === 'DELETE') && needsParams) {
                        // Extrae el primer parámetro entre llaves, ej: "{codigo}" → "codigo"
                        const match = ep.path.match(/{(\w+)}/);
                        const paramName = match ? match[1] : 'valor';
                        const example = `Ej: ${paramName.toUpperCase()}123`; // ejemplo genérico
                        const exampleValue = ep.params ? `Ejemplo: ${JSON.parse(ep.params)[paramName]}` || example : example;
                    
                        // Determinar el tipo de input basado en el nombre del parámetro
                        const inputType = paramName === 'fecha' ? 'date' : 'text';
                    
                        paramPlaceholder = `
                            <input type="${inputType}" class="form-control param-inline" id="${paramId}" 
                                placeholder="${exampleValue}" 
                                oninput="toggleButton('${paramId}')">
                            <small id="msg_${paramId}" class="text-danger d-none">Este campo es obligatorio.</small>
                        `;
                        btnDisabled = true;
                    }


                    container.innerHTML += `
                        <div class="endpoint-row">
                            <button class="btn btn-outline-${verb === 'GET' ? 'primary' : verb === 'POST' ? 'success' : verb === 'PUT' ? 'warning' : verb === 'PATCH' ? 'info' : 'danger'} btn-sm"
                                id="btn_${paramId}"
                                data-paramid="${paramId}"
                                 onclick="${
                                    verb === 'GET' && currentModel === 'factura'
                                        ? `mostrarFactura(); callEndpoint('${verb}', '${ep.path}', ${idx}, '${paramId}')`
                                        : (verb === 'POST' || verb === 'PUT')
                                        ? `showFormOrJson('${verb}', ${idx}, 'form');ocultarFactura();`
                                        : `callEndpoint('${verb}', '${ep.path}', ${idx}, '${paramId}');ocultarFactura();`
                                    }"
                                    ${btnDisabled ? 'disabled' : ''}>
                                    ${ep.name}
                                </button>
                            ${paramPlaceholder}
                            
                        </div>
                    `;
                });
                // Actualiza instrucciones al expandir acordeón
                const btn = document.querySelector('.accordion-button.' + verb.toLowerCase());
                if (btn) {
                    btn.onclick = function() {
                        updatePaso3Info(verb);
                        clearResults();
                        // Limpiar arrays de facturas bulk al cambiar de método
                        window.facturasBulkArray = [];
                        window.detallesFacturas = [[]];
                        window.facturaBulkIndex = 0;
                    };
                }
            });
        }
      
        
       function toggleButton(paramId) {
    const input = document.getElementById(paramId);
    const btn = document.getElementById('btn_' + paramId);
    const msg = document.getElementById('msg_' + paramId);

    const isValid = input.value.trim() !== '';
    btn.disabled = !isValid;

    // Mostrar u ocultar mensaje
    msg.classList.toggle('d-none', isValid);
}



        // Muestra el formulario o JSON para crear/editar un registro
        function showFormOrJson(verb, idx, mode) {
            // Si el modo es 'form', muestra el formulario; si es 'json', muestra el JSON
            formMode = mode;
            // Método HTTP actual
            currentVerb = verb;
            // Si el índice es -1, significa que es un nuevo registro
            currentEndpointIdx = idx;
            // Renderiza el formulario o JSON según el modo actual
            renderFormOrJson();
        }
        // Renderiza el formulario o JSON según el modo actual
      function renderFormOrJson() {
    const ep = endpoints[currentModel][currentVerb][currentEndpointIdx];
    let formHtml = '';
    let jsonHtml = '';
    let example = {};
    try {
        example = ep.params ? JSON.parse(ep.params) : {};
    } catch { example = {}; }
    const jsonToShow = lastResult ? lastResult : example;
    let formBtn = `<button class="btn btn-outline-primary btn-sm mb-2" type="button" onclick="setFormMode('form')">Formulario</button>`;
    let jsonBtn = `<button class="btn btn-outline-success btn-sm mb-2" type="button" onclick="setFormMode('json')">JSON</button>`;

    // Detectar si es POST factura o bulk
    const isFacturaPost = currentModel === 'factura' && currentVerb === 'POST' && ep.path === '/facturas';
    const isFacturaBulkPost = currentModel === 'factura' && currentVerb === 'POST' && ep.path === '/facturas/bulk';

    if (formMode === 'form' && (isFacturaPost || isFacturaBulkPost)) {
        // --- Formulario especial para factura (y bulk) ---
        formHtml = formBtn + `
    <form id="mainForm" oninput="syncFormToJson()">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <div></div>
            <div class="d-flex align-items-center gap-2">
                <div id="facturaBulkNav" class="me-2"></div>
            </div>
        </div>
        <p class="text-muted">Completa los datos de la factura.</p>
        <div class="mb-2">
            <label class="form-label">cliente_id</label>
            <input type="number" class="form-control" name="cliente_id" id="formField_cliente_id">
        </div>
        <div class="mb-2">
            <label class="form-label">vendedor_id</label>
            <input type="number" class="form-control" name="vendedor_id" id="formField_vendedor_id">
        </div>
        <div class="mb-2">
            <label class="form-label">condicion_pago_id</label>
            <input type="number" class="form-control" name="condicion_pago_id" id="formField_condicion_pago_id">
        </div>
        <div id="detallesContainer"></div>
        <div class="d-flex justify-content-between align-items-center mt-2">
            <button type="button" class="btn btn-outline-info btn-sm px-2 py-1" style="font-size:1.2rem;line-height:1;" title="Agregar producto" onclick="agregarDetalle()">+</button>
            <div class="d-flex gap-2 ms-auto">
                ${isFacturaBulkPost ? `<button type="button" class="btn btn-secondary btn-sm" onclick="agregarFacturaAlArray()">Añadir factura</button>` : ''}
                <button type="button" class="btn btn-success btn-sm" onclick="submitFormOrJson('form')">Enviar${isFacturaBulkPost ? ' todas' : ''}</button>
            </div>
        </div>
    </form>`;
        setTimeout(() => {
            if (!window.detallesFacturas) window.detallesFacturas = [[]];
            if (!window.facturaBulkIndex) window.facturaBulkIndex = 0;
            renderDetallesFactura();
            if (isFacturaBulkPost) renderFacturaBulkNav();
            // Mover la navegación de facturas arriba a la derecha
            const nav = document.getElementById('facturaBulkNav');
            if (nav) nav.classList.add('d-flex', 'justify-content-end', 'align-items-center', 'gap-2');
        }, 0);
        jsonHtml = jsonBtn + `<textarea id="jsonInput" class="form-control" style="height:300px" readonly>${JSON.stringify(jsonToShow, null, 2)}</textarea>`;
    } else if (formMode === 'form') {
        // Formulario normal para otros modelos
        formHtml = formBtn + `<form id="mainForm" oninput="syncFormToJson()">
            <p class="text-muted">Selecciona el formulario para ingresar los datos.</p>
            ${Object.keys(example).map(field => `
                <div class="mb-2">
                    <label class="form-label">${field}</label>
                    <input type="text" class="form-control" name="${field}" id="formField_${field}">
                </div>
            `).join('')}
            <button type="button" class="btn btn-success mt-2" onclick="submitFormOrJson('form')">Enviar</button>
        </form>`;
        jsonHtml = jsonBtn + `<textarea id="jsonInput" class="form-control" style="height:300px" readonly>${JSON.stringify(jsonToShow, null, 2)}</textarea>`;
    } else {
        formHtml = formBtn + `<div class="text-muted">Puedes usar el modo formulario para ingresar los datos.</div>`;
        jsonHtml = jsonBtn + `<textarea id="jsonInput" class="form-control" style="height:300px">${JSON.stringify(jsonToShow, null, 2)}</textarea>
            <button type="button" class="btn btn-success mt-2" onclick="submitFormOrJson('json')">Enviar</button>`;
    }
    document.getElementById('attrList').innerHTML = formHtml;
    document.getElementById('jsonView').innerHTML = jsonHtml;
}

// --- Lógica para detalles dinámicos de factura y bulk ---
window.detallesFacturas = [[]];
window.facturaBulkIndex = 0;
window.facturasBulkArray = [];
function agregarDetalle() {
    const idx = window.facturaBulkIndex || 0;
    if (!window.detallesFacturas[idx]) window.detallesFacturas[idx] = [];
    window.detallesFacturas[idx].push({ producto_id: '', cantidad: '', precio_unitario: '' });
    renderDetallesFactura();
}
function eliminarDetalle(i) {
    const idx = window.facturaBulkIndex || 0;
    window.detallesFacturas[idx].splice(i, 1);
    renderDetallesFactura();
}
function renderDetallesFactura() {
    const idx = window.facturaBulkIndex || 0;
    const detalles = window.detallesFacturas[idx] || [];
    const container = document.getElementById('detallesContainer');
    if (!container) return;
    let html = `<label class='form-label'>Detalles de productos</label>`;
    detalles.forEach((det, i) => {
        html += `<div class='row g-2 align-items-end mb-2'>
            <div class='col-4'><input type='number' class='form-control' placeholder='producto_id' value='${det.producto_id}' onchange='actualizarDetalle(${i},"producto_id",this.value)'></div>
            <div class='col-3'><input type='number' class='form-control' placeholder='cantidad' value='${det.cantidad}' onchange='actualizarDetalle(${i},"cantidad",this.value)'></div>
            <div class='col-4'><input type='number' class='form-control' placeholder='precio_unitario' value='${det.precio_unitario}' onchange='actualizarDetalle(${i},"precio_unitario",this.value)'></div>
            <div class='col-1'><button type='button' class='btn btn-danger btn-sm' onclick='eliminarDetalle(${i})'>&times;</button></div>
        </div>`;
    });
    container.innerHTML = html;
    syncFormToJson();
}
function actualizarDetalle(i, campo, valor) {
    const idx = window.facturaBulkIndex || 0;
    window.detallesFacturas[idx][i][campo] = valor;
    syncFormToJson();
}

// Sincroniza el formulario de factura (o bulk) con el textarea JSON
function syncFormToJson() {
    const form = document.getElementById('mainForm');
    if (!form) return;
    const formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    // Detectar si es bulk
    const isBulk = !!document.getElementById('facturaBulkNav');
    if (isBulk) {
        // Bulk: mostrar el array de facturas acumuladas + la actual si tiene datos
        const facturas = window.facturasBulkArray ? [...window.facturasBulkArray] : [];
        // Previsualiza la factura actual si tiene algún campo llenado
        const idx = window.facturaBulkIndex || 0;
        const detalles = (window.detallesFacturas[idx] || []).map(det => ({
            producto_id: Number(det.producto_id),
            cantidad: Number(det.cantidad),
            precio_unitario: Number(det.precio_unitario)
        }));
        if (Object.values(data).some(v => v) || detalles.length > 0) {
            data.detalles = detalles;
            facturas[idx] = data;
        }
        document.getElementById('jsonInput').value = JSON.stringify(facturas.filter(f => f), null, 2);
    } else {
        // Factura individual
        const idx = window.facturaBulkIndex || 0;
        data.detalles = (window.detallesFacturas[idx] || []).map(det => ({
            producto_id: Number(det.producto_id),
            cantidad: Number(det.cantidad),
            precio_unitario: Number(det.precio_unitario)
        }));
        document.getElementById('jsonInput').value = JSON.stringify(data, null, 2);
    }
}
function renderFacturaBulkNav() {
    const nav = document.getElementById('facturaBulkNav');
    if (!nav) return;
    nav.innerHTML = `
        <div class='d-flex align-items-center gap-2 my-2'>
            <button type='button' class='btn btn-outline-secondary btn-sm' onclick='anteriorFacturaBulk()' ${window.facturaBulkIndex === 0 ? 'disabled' : ''}>Anterior</button>
            <span>Factura ${window.facturaBulkIndex + 1}</span>
            <button type='button' class='btn btn-outline-secondary btn-sm' onclick='siguienteFacturaBulk()'>Siguiente</button>
        </div>
    `;
}
function siguienteFacturaBulk() {
    window.facturaBulkIndex = (window.facturaBulkIndex || 0) + 1;
    if (!window.detallesFacturas[window.facturaBulkIndex]) window.detallesFacturas[window.facturaBulkIndex] = [];
    document.getElementById('mainForm').reset();
    renderDetallesFactura();
    renderFacturaBulkNav();
}
function anteriorFacturaBulk() {
    if (window.facturaBulkIndex > 0) window.facturaBulkIndex--;
    renderDetallesFactura();
    renderFacturaBulkNav();
}
// --- Implementación faltante: agregarFacturaAlArray ---
function agregarFacturaAlArray() {
    // Obtiene los datos del formulario actual y los detalles
    const form = document.getElementById('mainForm');
    const formData = new FormData(form);
    let factura = {};
    formData.forEach((value, key) => {
        factura[key] = value;
    });
    // Añade los detalles de productos
    const idx = window.facturaBulkIndex || 0;
    factura.detalles = (window.detallesFacturas[idx] || []).map(det => ({
        producto_id: Number(det.producto_id),
        cantidad: Number(det.cantidad),
        precio_unitario: Number(det.precio_unitario)
    }));
    // Validar que la factura no esté vacía (al menos un campo o un detalle)
    const tieneCampos = Object.values(factura).some(v => v && v !== '' && v !== 0);
    const tieneDetalles = factura.detalles && factura.detalles.length > 0 && factura.detalles.some(d => d.producto_id && d.cantidad && d.precio_unitario);
    if (!tieneCampos && !tieneDetalles) {
        alert('No puedes añadir una factura vacía al lote.');
        return;
    }
    // Guarda la factura en el array bulk
    window.facturasBulkArray[idx] = factura;
    // Prepara el siguiente formulario vacío
    window.facturaBulkIndex = idx + 1;
    if (!window.detallesFacturas[window.facturaBulkIndex]) window.detallesFacturas[window.facturaBulkIndex] = [];
    document.getElementById('mainForm').reset();
    renderDetallesFactura();
    renderFacturaBulkNav();
    syncFormToJson();
}
        
        // Envia los datos del formulario o JSON mediante fetch.
        
        function submitFormOrJson(mode) {
            const ep = endpoints[currentModel][currentVerb][currentEndpointIdx];
            let url = apiBase + ep.path;
            let body = {};
            const isFacturaBulkPost = currentModel === 'factura' && currentVerb === 'POST' && ep.path === '/facturas/bulk';
            if (mode === 'form') {
                if (isFacturaBulkPost) {
                    // Antes de enviar, agrega la última factura escrita si no está vacía y no fue añadida
                    const form = document.getElementById('mainForm');
                    const formData = new FormData(form);
                    let ultimaFactura = {};
                    formData.forEach((value, key) => {
                        ultimaFactura[key] = value;
                    });
                    const idx = window.facturaBulkIndex || 0;
                    ultimaFactura.detalles = (window.detallesFacturas[idx] || []).map(det => ({
                        producto_id: Number(det.producto_id),
                        cantidad: Number(det.cantidad),
                        precio_unitario: Number(det.precio_unitario)
                    }));
                    const tieneCampos = Object.values(ultimaFactura).some(v => v && v !== '' && v !== 0);
                    const tieneDetalles = ultimaFactura.detalles && ultimaFactura.detalles.length > 0 && ultimaFactura.detalles.some(d => d.producto_id && d.cantidad && d.precio_unitario);
                    // Solo agrega si no está vacía y no fue añadida
                    if ((tieneCampos || tieneDetalles) && !window.facturasBulkArray[idx]) {
                        window.facturasBulkArray[idx] = ultimaFactura;
                    }
                    // Elimina facturas vacías del array
                    body = window.facturasBulkArray.filter(f => {
                        if (!f) return false;
                        const campos = Object.values(f).some(v => v && v !== '' && v !== 0);
                        const detalles = f.detalles && f.detalles.length > 0 && f.detalles.some(d => d.producto_id && d.cantidad && d.precio_unitario);
                        return campos || detalles;
                    });
                    if (!body.length) {
                        alert('Debes añadir al menos una factura válida al lote antes de enviar.');
                        return;
                    }
                } else {
                    const form = document.getElementById('mainForm');
                    const formData = new FormData(form);
                    formData.forEach((value, key) => {
                        body[key] = value;
                    });
                    // Si es factura individual, añade detalles
                    if (currentModel === 'factura' && currentVerb === 'POST' && ep.path === '/facturas') {
                        const idx = window.facturaBulkIndex || 0;
                        body.detalles = (window.detallesFacturas[idx] || []).map(det => ({
                            producto_id: Number(det.producto_id),
                            cantidad: Number(det.cantidad),
                            precio_unitario: Number(det.precio_unitario)
                        }));
                    }
                }
            } else {
                try {
                    body = JSON.parse(document.getElementById('jsonInput').value);
                } catch {
                    alert('JSON inválido');
                    return;
                }
            }
            let options = { method: currentVerb, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
            fetch(url, options)
                .then(r => r.json().then(data => ({ status: r.status, data })))
                .then(({ status, data }) => {
                    lastResult = data;
                    currentPage = 1;
                    renderResult(data, status);
                    if (status >= 200 && status < 300) {
                        alert('Registro exitoso');
                        // Limpiar lote después de enviar
                        if (isFacturaBulkPost) {
                            window.facturasBulkArray = [];
                            window.detallesFacturas = [[]];
                            window.facturaBulkIndex = 0;
                        }
                    }
                })
                .catch(err => {
                    document.getElementById('attrList').innerHTML = '<div class="text-danger">Error en la petición</div>';
                    document.getElementById('jsonView').innerHTML = '';
                });
        }

        function clearResults() {
            document.getElementById('attrList').innerHTML = '';
            document.getElementById('jsonView').innerHTML = '';
            // Limpiar el textarea de JSON si existe
            const jsonInput = document.getElementById('jsonInput');
            if (jsonInput) jsonInput.value = '';
            lastResult = null;
        }

       

        // Llama al endpoint con el verbo y la ruta especificada, usando el ID del input de parámetros
        function callEndpoint(verb, path, idx, paramId) {
            // Busca el input de params asociado usando el id recibido
            const input = document.getElementById(paramId);
            let params = {};
            let url = apiBase + path;

            // Si hay input, procesa params
         
                if (input && input.value.trim()) {
                    // Extrae el nombre del parámetro desde la ruta, ej: {codigo} => "codigo"
                    const match = path.match(/{(\w+)}/);
                    if (match) {
                        const paramName = match[1];
                        params[paramName] = input.value.trim();
                    }
                }


            // Reemplaza {id} y otros params en la ruta
            url = url.replace(/{(\w+)}/g, (_, k) => {
                if (params[k] !== undefined && params[k] !== null) {
                    const val = params[k];
                    delete params[k];
                    return val;
                }
                return `{${k}}`;
            });

            //Hace fetch y si el resultado incluye factura, renderiza visualización especial.
            let options = { method: verb, headers: { 'Content-Type': 'application/json' } };
            fetch(url, options)
                .then(r => r.json().then(data => ({ status: r.status, data })))
                .then(({ status, data }) => {
                    lastResult = data;
                    currentPage = 1;
                    renderResult(data, status);
                    if (url.includes('/factura')) {
                    crearFacturas(data);
                    console.log("Factura renderizada: ", data);
                    }
                })
                .catch(err => {
                    document.getElementById('attrList').innerHTML = '<div class="text-danger">Error en la petición</div>';
                    document.getElementById('jsonView').innerHTML = '';
                });
        }

        //Decide si el resultado es una lista o un objeto y renderiza acorde.
     function renderResult(data, status) {
    if (Array.isArray(data)) {
        renderAttrList(data);  // Mostrar todo, sin paginar
        renderJsonView(data);
    } else {
        renderAttrList(data);
        renderJsonView(data);
    }
  
    scrollToResultsIfMobile();
}

    //crea tabla de modelos y muestra atributos de cada uno.
     function renderAttrList(obj) {
    const attrList = document.getElementById('attrList');

    // Verifica si hay datos
    if (!obj || (Array.isArray(obj) && obj.length === 0)) {
        attrList.innerHTML = '<div class="text-muted">Sin datos</div>';
        return;
    }

    // Normaliza el dato para siempre trabajar con un array
    const dataArray = Array.isArray(obj) ? obj : [obj];

    // Obtiene todas las claves únicas de todos los objetos
    const headers = Array.from(new Set(dataArray.flatMap(item => Object.keys(item))));

    // Construye la tabla HTML
    let html = '<div class="table-responsive"><table class="table table-bordered table-sm mb-0">';
    html += '<thead class="table-light"><tr>';
    headers.forEach(header => html += `<th>${header}</th>`);
    html += '</tr></thead><tbody>';

    dataArray.forEach(item => {
        html += '<tr>';
        headers.forEach(header => {
            let val = item[header];
            if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
            html += `<td>${val !== undefined ? val : ''}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table></div>';
    attrList.innerHTML = html;
}

        //Muestra el JSON en formato <pre>.
        function renderJsonView(obj) {
            document.getElementById('jsonView').innerHTML = `
                <pre>${JSON.stringify(obj, null, 2)}</pre>
            `;
        }

    
//Si está en pantalla pequeña, hace scroll automático a los resultados.
        function scrollToResultsIfMobile() {
        const section = document.getElementById('resultsSection');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    //}
}
 // Inicialización
// Espera a que el usuario seleccione un modelo para mostrar los endpoints
// Así el acordeón de verbos HTTP estará vacío al inicio
// Inicialización
        renderModelList();


   
//Oculta la sección HTML para la factura.
function ocultarFactura() {
      const container = document.getElementById('facturaSection');
      const tabla = document.getElementById('attrList');
      const paginacion = document.getElementById('paginacionFacturas');
      container.style.display = 'none';
      tabla.style.display = 'block';
      paginacion.style.display = 'none';
    }
    
//Muestra la sección HTML para la factura.
function mostrarFactura() {
      const container = document.getElementById('facturaSection');
      const tabla = document.getElementById('attrList');
      const paginacion = document.getElementById('paginacionFacturas');
      container.style.display = 'block';
      tabla.style.display = 'none';
      paginacion.style.display = 'block';
    }        

//Recibe una o varias facturas.
//Las guarda en facturasArray y comienza a renderizar desde la primera.
function crearFacturas(facturas) {
  if (!facturas) {
    alert('No hay factura para mostrar');
    return;
  }

  if (Array.isArray(facturas)) {
    if (facturas.length === 0) {
      alert('No hay facturas en la lista');
      return;
    }

    facturasArray = facturas;
    facturaIndex = 0;
    renderFactura(facturasArray[facturaIndex]);
    renderFacturaPagination();
  } else {
    // Es solo una factura individual
    renderFactura(facturas);
  }
}



//Rellena los campos de la factura: fecha, cliente, vendedor, condición de pago, productos.
      function renderFactura(factura) {
      const container = document.getElementById('facturaSection');
console.log("renderFactura: ", factura);
      // Rellenar factura si aún no se ha hecho
      document.getElementById('fecha').textContent = `Fecha: ${new Date(factura.fecha).toLocaleDateString()}`;
      document.getElementById('cliente').innerHTML = `
        <strong>${factura.cliente.razon_social}</strong><br>
        RUT: ${factura.cliente.rut}<br>
        Dirección: ${factura.cliente.direccion}<br>
        Giro: ${factura.cliente.giro}
      `;
      document.getElementById('vendedor').textContent = factura.vendedore.nombre;
      document.getElementById('condicionPago').textContent = factura.CondicionPago.descripcion;

      const detalleContainer = document.getElementById('detalleProductos');
      detalleContainer.innerHTML = ''; // limpia si ya está renderizado

      //Convierte cada detalle en una fila de tabla.
      factura.detalles_facturas.forEach(det => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${det.producto.codigo}</td>
          <td>${det.producto.nombre}</td>
          <td>${det.cantidad}</td>
          <td>$${det.precio_unitario.toFixed(2)}</td>
          <td>$${det.subtotal.toFixed(2)}</td>
        `;

        detalleContainer.appendChild(row);
      });

      document.getElementById('subtotal').textContent = factura.subtotal.toFixed(2);
      document.getElementById('iva').textContent = factura.iva.toFixed(2);
      document.getElementById('total').textContent = factura.total.toFixed(2);
    }

      //Muestra los botones "Anterior" y "Siguiente" para cambiar de factura. 
function renderFacturaPagination() {
  const container = document.getElementById('paginacionFacturas');
  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mt-3">
      <button class="btn btn-sm btn-outline-secondary" onclick="navegarFactura(-1)" ${facturaIndex === 0 ? 'disabled' : ''}>Anterior</button>
      <span>Factura ${facturaIndex + 1} de ${facturasArray.length}</span>
      <button class="btn btn-sm btn-outline-secondary" onclick="navegarFactura(1)" ${facturaIndex === facturasArray.length - 1 ? 'disabled' : ''}>Siguiente</button>
    </div>
  `;
}

//Cambia el índice actual de factura y redibuja.
function navegarFactura(direccion) {
  facturaIndex += direccion;
  renderFactura(facturasArray[facturaIndex]);
  renderFacturaPagination();
}

// Actualiza el texto de instrucciones según el método HTTP seleccionado
function updatePaso3Info(verb) {
    const paso3 = document.getElementById('paso3info');
    if (!paso3) return;
    if (verb === 'GET' || verb === 'DELETE') {
        paso3.innerHTML = `Verás el <b>resultado</b> en formato <b>Tabla</b> y <b>JSON</b>.`;
    } else if (verb === 'POST' || verb === 'PUT') {
        paso3.innerHTML = `Elige el <b>formulario</b> o el campo para ingresar <b>JSON</b> y envía la información.`;
    } else if (verb === 'PATCH') {
        paso3.innerHTML = `Completa los datos necesarios y haz clic en <b>Enviar</b>.`;
    } else {
        paso3.innerHTML = '';
    }
}







