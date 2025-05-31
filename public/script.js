 // Configuración de endpoints por modelo
 let facturaIndex = 0;
let facturasArray = [];

        const apiBase = '/api';
        const endpoints = {
            usuario: {
                GET: [
                    { name: 'Obtener todos', path: '/usuarios', params: '' },
                    { name: 'Obtener por ID', path: '/usuarios/{id}', params: '{ "id": 1 }' },
                    { name: 'Mi usuario', path: '/usuarios/me', params: '' }
                ],
                POST: [
                    { name: 'Crear usuario', path: '/usuarios', params: '{ "nombre": "Ejemplo", "email": "ejemplo@mail.com", "password": "123456", "rol": "usuario" }' },
                    { name: 'Login', path: '/usuarios/login', params: '{ "email": "ejemplo@mail.com", "password": "123456" }' }
                ],
                PUT: [
                    { name: 'Actualizar usuario', path: '/usuarios/{id}', params: '{ "nombre": "Nuevo Nombre" }' }
                ],
                DELETE: [
                    { name: 'Eliminar usuario', path: '/usuarios/{id}', params: '{ "id": 1 }' }
                ]
            },
            producto: {
                GET: [
                    { name: 'Obtener todos', path: '/productos', params: '' },
                    { name: 'Obtener por ID', path: '/productos/{id}', params: '{ "id": 1 }' },
                    { name: 'Obtener por código', path: '/productos/codigo/{codigo}', params: '{ "codigo": "P001" }' }
                ],
                POST: [
                    { name: 'Crear producto', path: '/productos', params: '{ "codigo": "P001", "nombre": "Producto", "precio_unitario": 100, "stock": 10 }' },
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
                    { name: 'Obtener por ID', path: '/vendedores/{id}', params: '{ "id": 1 }' },
                    { name: 'Obtener por código', path: '/vendedores/codigo/{codigo}', params: '{ "codigo": "VEN001" }' }
                ],
                POST: [
                    { name: 'Crear vendedor', path: '/vendedores', params: '{ "nombre": "Vendedor", "email": "vendedor@mail.com", "telefono": "912345678" }' },
                    { name: 'Crear múltiples vendedores', path: '/vendedores/bulk', params: '[{ "nombre": "Vendedor 2", "email": "v2@mail.com", "telefono": "912345679" }]' }
                ],
                PUT: [
                    { name: 'Actualizar vendedor', path: '/vendedores/{id}', params: '{ "nombre": "Nuevo Vendedor" }' }
                ],
                DELETE: [
                    { name: 'Eliminar vendedor', path: '/vendedores/{id}', params: '{ "id": 1 }' }
                ]
            },
            folios: {
                GET: [
                    { name: 'Obtener todos', path: '/folios', params: '' },
                    { name: 'Obtener por ID', path: '/folios/{id}', params: '{ "id": 1 }' },
                    { name: 'Obtener por tipo', path: '/folios/tipo/{tipo}', params: '{ "tipo": "FACTURA" }' },
                    { name: 'Obtener por tipo y serie', path: '/folios/tipo/{tipo}/serie/{serie}', params: '{ "tipo": "FACTURA", "serie": "A" }' },
                    { name: 'Obtener siguiente disponible', path: '/folios/siguiente/{tipo}/{serie}', params: '{ "tipo": "FACTURA", "serie": "A" }' }
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
                    { name: 'Obtener por ID', path: '/condiciones-pago/{id}', params: '{ "id": 1 }' },
                    { name: 'Obtener por código', path: '/condiciones-pago/codigo/{codigo}', params: '{ "codigo": "CONTADO" }' },
                    { name: 'Obtener por plazo', path: '/condiciones-pago/plazo/{plazo}', params: '{ "plazo": 30 }' },
                    { name: 'Obtener por descripción', path: '/condiciones-pago/descripcion/{descripcion}', params: '{ "descripcion": "contado" }' }
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
                    { name: 'Obtener por ID', path: '/clientes/{id}', params: '{ "id": 1 }' },
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
                    { name: 'Eliminar cliente', path: '/clientes/{id}', params: '{ "id": 1 }' }
                ]
            },
            factura: {
                GET: [
                    { name: 'Obtener todas', path: '/facturas', params: '' },
                    { name: 'Obtener por ID', path: '/facturas/{id}', params: '{ "id": 1 }' },
                    { name: 'Obtener todas con detalles', path: '/facturas/with-details', params: '' },
                    { name: 'Obtener por ID con detalles', path: '/facturas/{id}/with-details', params: '{ "id": 1 }' },
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
                    { name: 'Eliminar factura', path: '/facturas/{id}', params: '{ "id": 1 }' }
                ]
            }
        };

        let currentModel = 'usuario';
        let lastResult = null;
        let currentPage = 1;
        let pageSize = 10;
        let formMode = null; // 'form' o 'json'
        let currentVerb = null;
        let currentEndpointIdx = null;

       function renderModelList() {
    const models = Object.keys(endpoints);
    const listHtml = models.map(model =>
        `<button class="list-group-item list-group-item-action${model === currentModel ? ' active' : ''}" onclick="selectModel('${model}')">${capitalize(model.replace('_', ' '))}</button>`
    ).join('');

    document.getElementById('modelList').innerHTML = `<div class="list-group">${listHtml}</div>`;
    document.getElementById('modelListMobile').innerHTML = listHtml;
}


        function capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        function selectModel(model) {
            currentModel = model;
            renderModelList();
            renderEndpoints();
            clearResults();
        }

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

                    //console.log("param id: "+paramId);
                    if ((verb === 'GET' || verb === 'DELETE') && needsParams) {
                        paramPlaceholder = `<input type="number" class="form-control param-inline" id="${paramId}" placeholder='${ep.params ? ep.params : "Número"}' oninput="validateParamsNumber('${paramId}', '${verb}', '${ep.path}', ${idx})">`;
                        btnDisabled = true;
                    }

                    // Elimina el botón Formulario/JSON del acordeón, deja solo el principal
                    let extraBtns = '';

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
                            ${extraBtns}
                            <small class="text-muted ms-2">${ep.path}</small>
                        </div>
                    `;
                });
            });
        }
      
      
        // Habilita el botón solo si el input tiene un número válido (GET/DELETE)
        function validateParamsNumber(paramId, verb, path, idx) {
            const input = document.getElementById(paramId);
            const btn = document.getElementById('btn_' + paramId);
            let valid = false;
            if (input.value.trim() && !isNaN(Number(input.value))) {
                valid = true;
            }
            btn.disabled = !valid;
        }

        function showFormOrJson(verb, idx, mode) {
            formMode = mode;
            currentVerb = verb;
            currentEndpointIdx = idx;
            renderFormOrJson();
        }

      function renderFormOrJson() {
    const ep = endpoints[currentModel][currentVerb][currentEndpointIdx];
    let formHtml = '';
    let jsonHtml = '';
    let example = {};
    try {
        example = ep.params ? JSON.parse(ep.params) : {};
    } catch { example = {}; }

    // Usa lastResult si está disponible
    const jsonToShow = lastResult ? lastResult : example;
    //console.log("jsonToShow: ", jsonToShow);
    //console.log("lastResult: ", lastResult);

    let formBtn = `<button class="btn btn-outline-secondary btn-sm mb-2" type="button" onclick="setFormMode('form')">Formulario</button>`;
    let jsonBtn = `<button class="btn btn-outline-secondary btn-sm mb-2" type="button" onclick="setFormMode('json')">JSON</button>`;

    if (formMode === 'form') {
        formHtml = formBtn + `<form id="mainForm" oninput="syncFormToJson()">
            ${Object.keys(example).map(field => `
                <div class="mb-2">
                    <label class="form-label">${field}</label>
                    <input type="text" class="form-control" name="${field}" id="formField_${field}">
                </div>
            `).join('')}
            <button type="button" class="btn btn-success mt-2" onclick="submitFormOrJson('form')">Enviar</button>
        </form>`;
        jsonHtml = jsonBtn + `<textarea id="jsonInput" class="form-control" style="height:300px">${JSON.stringify(jsonToShow, null, 2)}</textarea>`;
    } else {
        formHtml = formBtn + `<div class="text-muted">Puedes usar el modo formulario para ingresar los datos.</div>`;
        jsonHtml = jsonBtn + `<textarea id="jsonInput" class="form-control" style="height:300px">${JSON.stringify(jsonToShow, null, 2)}</textarea>
            <button type="button" class="btn btn-success mt-2" onclick="submitFormOrJson('json')">Enviar</button>`;
    }

    document.getElementById('attrList').innerHTML = formHtml;
    document.getElementById('jsonView').innerHTML = jsonHtml;
}


        function setFormMode(mode) {
            formMode = mode;
            renderFormOrJson();
        }

        function syncFormToJson() {
            const ep = endpoints[currentModel][currentVerb][currentEndpointIdx];
            let example = {};
            try {
                example = ep.params ? JSON.parse(ep.params) : {};
            } catch { example = {}; }
            let obj = {};
            Object.keys(example).forEach(field => {
                obj[field] = document.getElementById(`formField_${field}`).value;
            });
            document.getElementById('jsonInput').value = JSON.stringify(obj, null, 2);
        }

        function submitFormOrJson(mode) {
            const ep = endpoints[currentModel][currentVerb][currentEndpointIdx];
            let url = apiBase + ep.path;
            let body = {};
            if (mode === 'form') {
                const form = document.getElementById('mainForm');
                const formData = new FormData(form);
                formData.forEach((value, key) => {
                    body[key] = value;
                });
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
        }

        function callEndpoint(verb, path, idx, paramId) {
            // Busca el input de params asociado usando el id recibido
            const input = document.getElementById(paramId);
            let params = {};
            let url = apiBase + path;

            // Si hay input, procesa params
            if (input && input.value.trim()) {
                params = { id: Number(input.value) };
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


        function renderAttrList(obj) {
            const attrList = document.getElementById('attrList');
            // Si recibe un array, muestra tabla paginada
            if (Array.isArray(obj)) {
                if (!obj.length) {
                    attrList.innerHTML = '<div class="text-muted">Sin datos</div>';
                    return;
                }
                // Encabezados de tabla
                const headers = Object.keys(obj[0]);
                let html = '<div class="table-responsive"><table class="table table-bordered table-sm mb-0">';
                html += '<thead class="table-light"><tr>';
                headers.forEach(h => html += `<th>${h}</th>`);
                html += '</tr></thead><tbody>';
                obj.forEach(item => {
                    html += '<tr>';
                    headers.forEach(h => {
                        let val = item[h];
                        if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
                        html += `<td>${val !== undefined ? val : ''}</td>`;
                    });
                    html += '</tr>';
                });
                html += '</tbody></table></div>';
                attrList.innerHTML = html;
            } else if (!obj) {
                attrList.innerHTML = '<div class="text-muted">Sin datos</div>';
            } else {
                // Muestra como formulario simple (solo lectura)
                let html = '<form>';
                Object.entries(obj).forEach(([k, v]) => {
                    html += `
                        <div class="mb-2">
                            <label class="form-label">${k}</label>
                            <input type="text" class="form-control" value="${typeof v === 'object' ? JSON.stringify(v) : v}" readonly>
                        </div>
                    `;
                });
                html += '</form>';
                attrList.innerHTML = html;
            }
        }

        function renderJsonView(obj) {
            document.getElementById('jsonView').innerHTML = `<pre>${JSON.stringify(obj, null, 2)}</pre>`;
        }

    

    

        function scrollToResultsIfMobile() {
    if (window.innerWidth < 992) {  // Bootstrap lg breakpoint
        const section = document.getElementById('resultsSection');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
 // Inicialización
        renderModelList();
        renderEndpoints();







   

function ocultarFactura() {
      const container = document.getElementById('facturaSection');
      container.style.display = 'none';
    }
    

function mostrarFactura() {
      const container = document.getElementById('facturaSection');
      container.style.display = 'block';}


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
    facturasArray = [facturas]; // También la almacenamos como array por si se necesita paginar luego
    facturaIndex = 0;
    renderFacturaPagination(); // Si quieres evitar paginación en este caso, comenta esta línea
  }
}




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

function navegarFactura(direccion) {
  facturaIndex += direccion;
  renderFactura(facturasArray[facturaIndex]);
  renderFacturaPagination();
}


  



  
