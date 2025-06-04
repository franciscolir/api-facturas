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
                    { name: 'Actualizar usuario', path: '/usuarios/{id}', params: '{ "id": 1, "nombre": "Ejemplo", "email": "ejemplo@mail.com",  "rol": "usuario" }' }
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
                    { name: 'Actualizar producto', path: '/productos/{id}', params: '{ "id": 1, "codigo": "P002", "nombre": "Producto 2", "precio_unitario": 200, "stock": 20 }' }
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
                    { name: 'Actualizar vendedor', path: '/vendedores/{id}', params: '{ "id": 1, "nombre": "Vendedor 2", "email": "v2@mail.com", "telefono": "912345679" }' }
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
                    { name: 'Actualizar folio', path: '/folios/{id}', params: '{ "id": 1, "estado": "usado" }' },
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
                    { name: 'Actualizar condición', path: '/condiciones-pago/{id}', params: '{ "id": 1, "codigo": "CONTADO", "descripcion": "Pago al contado", "plazo": 0 }' }
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
                    { name: 'Actualizar cliente', path: '/clientes/{id}', params: '{ "id": 1, "rut": "98765432-1", "razon_social": "Empresa 2", "direccion": "Calle 456", "comuna": "Comuna", "ciudad": "Ciudad", "giro": "Servicios", "email": "cliente2@mail.com", "telefono": "912345679" }' }
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
                    { name: 'Actualizar factura', path: '/facturas/{id}', params: '{ "id": 1, "estado": "emitida" }' }
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

                    // SOLO para GET y DELETE se muestra input de parámetro
                    if ((verb === 'GET' || verb === 'DELETE') && needsParams) {
                        const match = ep.path.match(/{(\w+)}/);
                        const paramName = match ? match[1] : 'valor';
                        let exampleValue = 'Ejemplo: 1';
                        if (ep.params) {
                            try {
                                const parsed = JSON.parse(ep.params);
                                if (parsed && typeof parsed === 'object' && paramName in parsed && parsed[paramName] !== undefined) {
                                    exampleValue = `Ejemplo: ${parsed[paramName]}`;
                                }
                            } catch {}
                        }
                        const inputType = paramName === 'fecha' ? 'date' : 'text';
                        paramPlaceholder = `
                            <input type="${inputType}" class="form-control param-inline" id="${paramId}" 
                                placeholder="${exampleValue}" 
                                oninput="toggleButton('${paramId}')">
                            <small id="msg_${paramId}" class="text-danger d-none">Este campo es obligatorio.</small>
                        `;
                        btnDisabled = true;
                    }

                    // PUT: solo muestra el formulario, el id se tomará del form al enviar
                    container.innerHTML += `
                        <div class="endpoint-row">
                            <button class="btn btn-outline-${verb === 'GET' ? 'primary' : verb === 'POST' ? 'success' : verb === 'PUT' ? 'warning' : verb === 'PATCH' ? 'info' : 'danger'} btn-sm"
                                id="btn_${paramId}"
                                data-paramid="${paramId}"
                                onclick="${
                                    verb === 'GET' && currentModel === 'factura'
                                        ? `mostrarFactura(); callEndpoint('${verb}', '${ep.path}', ${idx}, '${paramId}')`
                                        : (verb === 'POST' || verb === 'PUT')
                                        ? `showFormOrJson('${verb}', ${idx}, 'form');ocultarFactura();  scrollToResultsIfMobile();`
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

if (Array.isArray(example) && example.length > 0 && typeof example[0] === 'object') {
    example = example[0];
}


    const jsonToShow = lastResult ? lastResult : example;
    let formBtn = `<button class="btn btn-outline-primary btn-sm mb-2${formMode==='form'?' active':''}" type="button" onclick="setFormMode('form')">Formulario</button>`;
    let jsonBtn = `<button class="btn btn-outline-success btn-sm mb-2${formMode==='json'?' active':''}" type="button" onclick="setFormMode('json')">JSON</button>`;

    // Detectar si es POST bulk para cualquier modelo
    const isBulkPost = currentVerb === 'POST' && ep.path.endsWith('/bulk');
    const isFacturaPost = currentModel === 'factura' && currentVerb === 'POST' && ep.path === '/facturas';
    const isFacturaBulkPost = currentModel === 'factura' && currentVerb === 'POST' && ep.path === '/facturas/bulk';

    if (formMode === 'form' && (isBulkPost || isFacturaPost)) {
        // Inicialización de arrays dinámicos para cada modelo
        if (!window.bulkFormArrays) window.bulkFormArrays = {};
        const bulkKey = `${currentModel}_${currentVerb}_${currentEndpointIdx}`;
        if (!window.bulkFormArrays[bulkKey]) {
            window.bulkFormArrays[bulkKey] = { array: [], index: 0, detalles: [[]] };
        }
        const bulkState = window.bulkFormArrays[bulkKey];

        // Si es factura, usa UI especial
        if (isFacturaPost || isFacturaBulkPost) {
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
                const nav = document.getElementById('facturaBulkNav');
                if (nav) nav.classList.add('d-flex', 'justify-content-end', 'align-items-center', 'gap-2');
            }, 0);
            jsonHtml = jsonBtn + `<textarea id="jsonInput" class="form-control" style="height:300px" readonly>${JSON.stringify(jsonToShow, null, 2)}</textarea>`;
        } else {
            // --- Formulario bulk genérico para otros modelos ---
            formHtml = formBtn + `
            <form id="mainForm" oninput="syncFormToJsonBulk('${bulkKey}')">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div></div>
                    <div class="d-flex align-items-center gap-2">
                        <div id="bulkNav_${bulkKey}" class="me-2"></div>
                    </div>
                </div>
                <p class="text-muted">Completa los datos del registro.</p>
                ${Object.keys(example).map(field => `
                    <div class="mb-2">
                        <label class="form-label">${field}</label>
                        <input type="text" class="form-control" name="${field}" id="formField_${field}">
                    </div>
                `).join('')}
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <div class="d-flex gap-2 ms-auto">
                        <button type="button" class="btn btn-secondary btn-sm" onclick="agregarRegistroAlArrayBulk('${bulkKey}')">Añadir registro</button>
                        <button type="button" class="btn btn-success btn-sm" onclick="submitFormOrJsonBulk('${bulkKey}')">Enviar todos</button>
                    </div>
                </div>
            </form>`;
            setTimeout(() => {
                renderBulkNav(bulkKey);
            }, 0);
            jsonHtml = jsonBtn + `<textarea id="jsonInput" class="form-control" style="height:300px" readonly>${JSON.stringify(jsonToShow, null, 2)}</textarea>`;
        }
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
    } else if (formMode === 'json') {
        formHtml = formBtn + `<div class="text-muted">Puedes usar el modo formulario para ingresar los datos.</div>`;
        jsonHtml = jsonBtn + `<textarea id="jsonInput" class="form-control" style="height:300px">${JSON.stringify(example, null, 2)}</textarea>
            <button type="button" class="btn btn-success mt-2" onclick="submitFormOrJson('json')">Enviar</button>`;
    } else {
        formHtml = formBtn + `<div class="text-muted">Puedes usar el modo formulario para ingresar los datos.</div>`;
        jsonHtml = jsonBtn + `<textarea id="jsonInput" class="form-control" style="height:300px">${JSON.stringify(jsonToShow, null, 2)}</textarea>
            <button type="button" class="btn btn-success mt-2" onclick="submitFormOrJson('json')">Enviar</button>`;
    }
    document.getElementById('attrList').innerHTML = formHtml;
    document.getElementById('jsonView').innerHTML = jsonHtml;
}

// --- Lógica para formularios bulk genéricos ---
function agregarRegistroBulk(bulkKey) {
    // Simplemente limpia el formulario para el siguiente registro
    document.getElementById('mainForm').reset();
    window.bulkFormArrays[bulkKey].index++;
    renderBulkNav(bulkKey);
    syncFormToJsonBulk(bulkKey);
}
function agregarRegistroAlArrayBulk(bulkKey) {
    const form = document.getElementById('mainForm');
    const formData = new FormData(form);
    let registro = {};
    formData.forEach((value, key) => {
        registro[key] = value;
    });
    // Validar que el registro no esté vacío
    const tieneCampos = Object.values(registro).some(v => v && v !== '' && v !== 0);
    if (!tieneCampos) {
        alert('No puedes añadir un registro vacío al lote.');
        return;
    }
    const idx = window.bulkFormArrays[bulkKey].index;
    window.bulkFormArrays[bulkKey].array[idx] = registro;
    window.bulkFormArrays[bulkKey].index = idx + 1;
    document.getElementById('mainForm').reset();
    renderBulkNav(bulkKey);
    syncFormToJsonBulk(bulkKey);
}
function renderBulkNav(bulkKey) {
    const nav = document.getElementById('bulkNav_' + bulkKey);
    if (!nav) return;
    const idx = window.bulkFormArrays[bulkKey].index;
    nav.innerHTML = `
        <div class='d-flex align-items-center gap-2 my-2'>
            <span>Registro ${idx + 1}</span>
        </div>
    `;
}
function syncFormToJsonBulk(bulkKey) {
    const form = document.getElementById('mainForm');
    if (!form) return;
    const formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    const registros = window.bulkFormArrays[bulkKey].array ? [...window.bulkFormArrays[bulkKey].array] : [];
    const idx = window.bulkFormArrays[bulkKey].index;
    if (Object.values(data).some(v => v && v !== '' && v !== 0)) {
        registros[idx] = data;
    }
    document.getElementById('jsonInput').value = JSON.stringify(registros.filter(r => r), null, 2);
}
// --- Lógica para facturas bulk ---

function submitFormOrJsonBulk(bulkKey) {
    const ep = endpoints[currentModel][currentVerb][currentEndpointIdx];
    let url = apiBase + ep.path;
    let registros = window.bulkFormArrays[bulkKey].array.filter(r => r && Object.values(r).some(v => v && v !== '' && v !== 0));
    // Agrega el último registro si no fue añadido
    const form = document.getElementById('mainForm');
    const formData = new FormData(form);
    let ultimo = {};
    formData.forEach((value, key) => {
        ultimo[key] = value;
    });
    if (Object.values(ultimo).some(v => v && v !== '' && v !== 0) && !registros[window.bulkFormArrays[bulkKey].index]) {
        registros[window.bulkFormArrays[bulkKey].index] = ultimo;
    }
    registros = registros.filter(r => r && Object.values(r).some(v => v && v !== '' && v !== 0));
    if (!registros.length) {
        alert('Debes añadir al menos un registro válido al lote antes de enviar.');
        return;
    }
    let options = { method: currentVerb, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(registros) };
    fetch(url, options)
        .then(r => r.json().then(data => ({ status: r.status, data })))
        .then(({ status, data }) => {
            lastResult = data;
            currentPage = 1;
            renderResult(data, status);
            if (status >= 200 && status < 300) {
                alert('Registro exitoso');
                // Limpiar lote después de enviar
                window.bulkFormArrays[bulkKey] = { array: [], index: 0, detalles: [[]] };
            }
        })
        .catch(err => {
            document.getElementById('attrList').innerHTML = '<div class="text-danger">Error en la petición</div>';
            document.getElementById('jsonView').innerHTML = '';
        });
}

// Si está en pantalla pequeña, hace scroll automático a los resultados.
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



// Rellena los campos de la factura: fecha, cliente, vendedor, condición de pago, productos.
function renderFactura(factura) {
    const container = document.getElementById('facturaSection');
    // Validar y mostrar fecha
    if (factura.fecha) {
        document.getElementById('fecha').textContent = `Fecha: ${new Date(factura.fecha).toLocaleDateString()}`;
    } else {
        document.getElementById('fecha').textContent = 'Fecha: -';
    }

    // Validar y mostrar datos del cliente
    if (factura.cliente) {
        document.getElementById('cliente').innerHTML = `
            <strong>${factura.cliente.razon_social || '-'}</strong><br>
            RUT: ${factura.cliente.rut || '-'}<br>
            Dirección: ${factura.cliente.direccion || '-'}<br>
            Giro: ${factura.cliente.giro || '-'}
        `;
    } else {
        document.getElementById('cliente').innerHTML = '<span class="text-danger">Sin datos de cliente</span>';
    }

    // Validar y mostrar vendedor
    if (factura.vendedore && factura.vendedore.nombre) {
        document.getElementById('vendedor').textContent = factura.vendedore.nombre;
    } else {
        document.getElementById('vendedor').textContent = '-';
    }

    // Validar y mostrar condición de pago
    if (factura.CondicionPago && factura.CondicionPago.descripcion) {
        document.getElementById('condicionPago').textContent = factura.CondicionPago.descripcion;
    } else {
        document.getElementById('condicionPago').textContent = '-';
    }

    // Renderizar detalles de productos
    const detalleContainer = document.getElementById('detalleProductos');
    detalleContainer.innerHTML = '';
    if (Array.isArray(factura.detalles_facturas) && factura.detalles_facturas.length > 0) {
        factura.detalles_facturas.forEach(det => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${det.producto && det.producto.codigo ? det.producto.codigo : '-'}</td>
                <td>${det.producto && det.producto.nombre ? det.producto.nombre : '-'}</td>
                <td>${det.cantidad !== undefined ? det.cantidad : '-'}</td>
                <td>$${det.precio_unitario !== undefined ? Number(det.precio_unitario).toFixed(2) : '-'}</td>
                <td>$${det.subtotal !== undefined ? Number(det.subtotal).toFixed(2) : '-'}</td>
            `;
            detalleContainer.appendChild(row);
        });
    } else {
        // Si no hay detalles, mostrar una fila vacía
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" class="text-center text-muted">Sin detalles de productos</td>`;
        detalleContainer.appendChild(row);
    }

    // Mostrar totales, validando existencia
    document.getElementById('subtotal').textContent = factura.subtotal !== undefined ? Number(factura.subtotal).toFixed(2) : '-';
    document.getElementById('iva').textContent = factura.iva !== undefined ? Number(factura.iva).toFixed(2) : '-';
    document.getElementById('total').textContent = factura.total !== undefined ? Number(factura.total).toFixed(2) : '-';

    // Mostrar JSON crudo de la factura actual
    const jsonView = document.getElementById('jsonView');
    if (jsonView) {
        jsonView.innerHTML = `<textarea class='form-control' style='height:300px'>${JSON.stringify(factura, null, 2)}</textarea>`;
    }
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

function clearResults() {
    // Limpia resultados previos (puedes personalizar si quieres limpiar algo específico)
    document.getElementById('attrList').innerHTML = '';
    document.getElementById('jsonView').innerHTML = '';
}

// Sincroniza el formulario simple con el JSON mostrado en el textarea de la derecha
function syncFormToJson() {
    // Sincroniza el formulario simple con el JSON (puedes personalizar si quieres mostrar el JSON en tiempo real)
    const form = document.getElementById('mainForm');
    if (!form) return;
    const formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    const jsonInput = document.getElementById('jsonInput');
    if (jsonInput) jsonInput.value = JSON.stringify(data, null, 2);
}

// Envía los datos del formulario o JSON al endpoint correspondiente y maneja la respuesta
function submitFormOrJson(mode) {
    const ep = endpoints[currentModel][currentVerb][currentEndpointIdx];
    let url = apiBase + ep.path;
    let data;
    if (mode === 'form') {
        const form = document.getElementById('mainForm');
        if (!form) return;
        const formData = new FormData(form);
        data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        // Si es PUT y la ruta tiene parámetro, reemplazarlo por el valor del form
        if (currentVerb === 'PUT') {
            // Filtrar campos vacíos para PUT
            Object.keys(data).forEach(key => {
                if (data[key] === '' || data[key] === null || data[key] === undefined) {
                    delete data[key];
                }
            });
            const match = ep.path.match(/{(\w+)}/);
            if (match) {
                const paramName = match[1];
                if (data[paramName]) {
                    url = apiBase + ep.path.replace(/{(\w+)}/, data[paramName]);
                    // Opcional: eliminar el campo id del body si no se debe enviar
                    // delete data[paramName];
                } else {
                    alert('Debes completar el campo ' + paramName + ' en el formulario.');
                    return;
                }
            }
        }
    } else if (mode === 'json') {
        const jsonInput = document.getElementById('jsonInput');
        try {
            data = JSON.parse(jsonInput.value);
        } catch {
            alert('JSON inválido');
            return;
        }
    }
    let options = { method: currentVerb, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
    fetch(url, options)
        .then(async r => {
            // Intenta parsear la respuesta como JSON, si falla intenta como texto
            let resp;
            try {
                resp = await r.json();
            } catch {
                try {
                    const text = await r.text();
                    resp = { message: text };
                } catch {
                    resp = {};
                }
            }
            return { status: r.status, data: resp };
        })
        .then(({ status, data }) => {
            // Actualiza el resultado y muestra feedback visual y alertas según éxito o error
            lastResult = data;
            currentPage = 1;
            renderResult(data, status);
            if (status >= 200 && status < 300) {
                alert('Registro exitoso');
                const form = document.getElementById('mainForm');
                if (mode === 'form' && form) form.reset();
            } else {
                let msg = data?.message || data?.error || JSON.stringify(data);
                if (!msg || msg === '{}' || msg === '""') msg = 'Error desconocido';
                document.getElementById('attrList').innerHTML = `<div class='text-danger'>${msg}</div>`;
                alert(msg);
            }
        })
        .catch(async err => {
            // Manejo de errores de red o inesperados
            let msg = 'Error en la petición';
            if (err && err.message) msg = err.message;
            document.getElementById('attrList').innerHTML = `<div class="text-danger">${msg}</div>`;
            document.getElementById('jsonView').innerHTML = '';
            alert(msg);
        });
}

// Llama a un endpoint GET o DELETE, resolviendo parámetros de la ruta si es necesario
function callEndpoint(verb, path, idx, paramId) {
    let url = apiBase + path;
    // Si la ruta tiene parámetro, reemplazarlo por el valor del input
    const needsParams = path.match(/{(\w+)}/g);
    if (needsParams && paramId) {
        const input = document.getElementById(paramId);
        if (!input || !input.value.trim()) {
            const msg = document.getElementById('msg_' + paramId);
            if (msg) msg.classList.remove('d-none');
            alert('Debes completar el campo requerido.');
            return;
        }
        url = apiBase + path.replace(/{(\w+)}/, input.value.trim());
    }
    let options = { method: verb };
    fetch(url, options)
        .then(async r => {
            let resp;
            try {
                resp = await r.json();
            } catch {
                try {
                    const text = await r.text();
                    resp = { message: text };
                } catch {
                    resp = {};
                }
            }
            return { status: r.status, data: resp };
        })
        .then(({ status, data }) => {
            lastResult = data;
            currentPage = 1;
            // Mostrar factura si corresponde
            if (currentModel === 'factura' && verb === 'GET') {
                crearFacturas(data);
                mostrarFactura();
            } else {
                renderResult(data, status);
            }
            scrollToResultsIfMobile();
        })
        .catch(async err => {
            let msg = 'Error en la petición';
            if (err && err.message) msg = err.message;
            document.getElementById('attrList').innerHTML = `<div class="text-danger">${msg}</div>`;
            document.getElementById('jsonView').innerHTML = '';
            alert(msg);
        });
}

// Renderiza el resultado de la API en formato tabla, lista o JSON según el tipo de datos recibido
function renderResult(data, status) {
    // Muestra el resultado en formato JSON y tabla simple si es posible
    const attrList = document.getElementById('attrList');
    const jsonView = document.getElementById('jsonView');
    if (!attrList || !jsonView) return;
    // Mostrar como tabla si es un array de objetos
    if (Array.isArray(data) && data.length && typeof data[0] === 'object') {
        let headers = Object.keys(data[0]);
        let table = `<table class='table table-bordered table-sm'><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>`;
        table += data.map(row => `<tr>${headers.map(h=>`<td>${row[h]}</td>`).join('')}</tr>`).join('');
        table += '</tbody></table>';
        // Contenedor responsivo con scroll horizontal
        attrList.innerHTML = `<div style="overflow-x:auto; width:100%">${table}</div>`;
    } else if (typeof data === 'object' && data !== null) {
        // Mostrar como lista de atributos
        let list = '<ul class="list-group">';
        for (let k in data) {
            list += `<li class="list-group-item"><b>${k}:</b> ${JSON.stringify(data[k])}</li>`;
        }
        list += '</ul>';
        attrList.innerHTML = list;
    } else {
        attrList.innerHTML = `<div>${data}</div>`;
    }
    // Mostrar siempre el JSON crudo
    jsonView.innerHTML = `<textarea class='form-control' style='height:300px'>${JSON.stringify(data, null, 2)}</textarea>`;
}







