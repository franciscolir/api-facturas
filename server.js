require('dotenv').config();
const app = require('./app/app');
require('./jobs/pagos-vencidos.job');

const PORT = process.env.PORT || 3000;


//agrega opciones para que se pueda acceder desde cualquier ip
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
