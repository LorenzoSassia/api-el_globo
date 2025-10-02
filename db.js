const mysql = require('mysql2');

const conexion = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'el-globo'
});

conexion.connect(err => {
    if (err) throw err;
    console.log('Conectado a MySQL');
});

module.exports = conexion;
