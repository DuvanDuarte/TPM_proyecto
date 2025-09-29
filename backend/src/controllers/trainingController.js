const connection = require('../models/db');

module.exports.createTraining = (req, res) => {
  const { nombre, modalidad, descripcion } = req.body;

  // Validar campos obligatorios
  if (!nombre || !modalidad || !descripcion) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  const query = `
    INSERT INTO entrenamientos (nombreEnt, idModalidad, descripcion)
    VALUES (?, ?, ?)
  `;

  connection.query(query, [nombre, modalidad, descripcion], (err, result) => {
    if (err) {
      console.error('Error al crear entrenamiento:', err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }
    res.status(201).json({ message: 'Entrenamiento creado correctamente', trainingId: result.insertId });
  });
};