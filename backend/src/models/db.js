const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  ssl: {
    rejectUnauthorized: false // para desarrollo local, en producción debes usar certificado válido
  }
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a BD:', error);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});


module.exports = connection;