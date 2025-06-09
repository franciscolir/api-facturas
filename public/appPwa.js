// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('✅ Service Worker registrado', reg))
    .catch(err => console.error('❌ Error al registrar SW', err));
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
    // Simulamos el registro con una API pública (jsonplaceholder no acepta más campos, pero esto es para aprender)
    const response = await fetch('http://localhost:3001/api/usuarios/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        email,
        password, // en API reales esto debería ir cifrado en backend
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
    console.error(err);
    statusEl.textContent = `❌ ${err.message}`;
  }
});

