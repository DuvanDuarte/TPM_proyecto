const connection = require('../models/db');

module.exports.getAllUsers = (req, res) => {
    const query = `
    SELECT documento, nombre, fechaNacimiento, email, idTipoUsuario
    FROM usuarios
    ORDER BY idTipoUsuario ASC, nombre ASC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }
    res.status(200).json(results);
  });
};