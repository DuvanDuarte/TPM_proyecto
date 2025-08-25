const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootLocalDan',
    database: 'tmpdb',
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a BD:', error);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});


module.exports = connection;