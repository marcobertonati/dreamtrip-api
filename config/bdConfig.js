// Eequerimos mysql
const mysql = require('mysql');

// Definimos base de datos
const options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dreamtrip_API', //base de datos
};

// Creamos conexión a base de datos
const conexion_db = mysql.createConnection(options);

// Conectamos base de datos
conexion_db.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Conexión a base de datos exitosa');
        }
    })

// Exportamos
module.exports = { options, conexion_db }