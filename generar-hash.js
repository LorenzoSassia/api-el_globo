const bcrypt = require('bcrypt');

/**
 * Este script genera un hash de bcrypt para una contraseña dada.
 * Úsalo para crear contraseñas hasheadas que puedas guardar manualmente en tu base de datos.
 *
 * CÓMO USARLO:
 * 1. Asegúrate de tener 'bcrypt' instalado (`npm install bcrypt`)
 * 2. Guarda este archivo como `generar-hash.js` en la raíz de tu API.
 * 3. Abre tu terminal en esa carpeta.
 * 4. Ejecuta: node generar-hash.js TU_CONTRASENA_AQUI
 *
 * EJEMPLO:
 * node generar-hash.js 123456
 */

// Toma la contraseña del tercer argumento en la línea de comandos
const contrasenaEnTextoPlano = process.argv[2];

if (!contrasenaEnTextoPlano) {
  console.error('Error: Por favor proporciona una contraseña.');
  console.log('Uso: node generar-hash.js <tu_contrasena>');
  process.exit(1); // Salir con código de error
}

const saltRounds = 10;

console.log(`Generando hash para: "${contrasenaEnTextoPlano}"...`);

bcrypt.hash(contrasenaEnTextoPlano, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al generar el hash:', err);
    return;
  }

  console.log('\n¡Hash generado con éxito!\n');
  console.log('Copia y pega este hash en la columna "contrasena" de tu base de datos:');
  console.log('-------------------------------------------------------------------');
  console.log(hash);
  console.log('-------------------------------------------------------------------');
});