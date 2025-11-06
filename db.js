/*const mysql = require('mysql2/promise');

const conexion = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'el-globo',
    waitForConnections: true, // Espera si todas las conexiones están en uso
    connectionLimit: 10,      // Número de conexiones en la piscina
    queueLimit: 0             // Cola ilimitada de consultas
});

/*conexion.connect(err => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

console.log('Pool de conexiones a MySQL creado exitosamente.');

// 3. Exporta la 'pool'
module.exports = pool;
*/

const mysql = require('mysql2/promise');

// 1. Define 'pool' usando createPool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'el-globo',
    waitForConnections: true, // Espera si todas las conexiones están en uso
    connectionLimit: 10,      // Número de conexiones en la piscina
    queueLimit: 0             // Cola ilimitada de consultas
});

// (Ya no necesitas 'conexion.connect()', la piscina lo maneja)
console.log('Pool de conexiones a MySQL creado exitosamente.');

// 2. Exporta la variable 'pool' que SÍ definiste
module.exports = pool;

