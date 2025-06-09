// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('✅ Service Worker registrado', reg))
    .catch(err => console.error('❌ Error al registrar SW', err));
}

// Función para obtener la URL base del servidor
function getBaseUrl() {
  // Si estamos en desarrollo, usa localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:3001';
  }
  // En producción, usa la URL relativa
  return '';
}

// Manejar el envío del formulario
document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  // Obtener valores del formulario
  const nombre = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const rol = document.getElementById('role').value;

  const statusEl = document.getElementById('status');
  statusEl.textContent = 'Registrando...';

  try {
    const baseUrl = getBaseUrl();
    const response = await fetch(`${baseUrl}/api/usuarios/`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        email,
        password,
        rol
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || 'Error en el registro');
    }

    const data = await response.json();
    statusEl.textContent = `✅ Usuario registrado con ID ${data.id}`;
  } catch (err) {
    console.error('Error completo:', err);
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      statusEl.textContent = '❌ Error de conexión. Verifica tu conexión a internet o que el servidor esté disponible.';
    } else {
      statusEl.textContent = `❌ ${err.message}`;
    }
  }
});

