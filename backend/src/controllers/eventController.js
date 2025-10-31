const connection = require('../models/db');

// Crear evento
module.exports.createEvento = (req, res) => {
  const { fechaEvento, lugarEvento, evento, descEvento, tipoEvento } = req.body;

  // Validar campos obligatorios
  if (!fechaEvento || !lugarEvento || !evento || !tipoEvento) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  const query = `
    INSERT INTO eventos (fechaEvento, lugarEvento, evento, descEvento, tipoEvento)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Nota: fechaEvento debe venir en formato YYYY-MM-DD
  const params = [fechaEvento, lugarEvento, evento, descEvento, tipoEvento];

  connection.query(query, params, (err, result) => {
    if (err) {
      console.error('Error al crear evento:', err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }
    res.status(201).json({ message: 'Evento creado correctamente', eventoId: result.insertId });
  });
};

// Obtener todos los eventos
module.exports.getEventos = (req, res) => {
  const query = `
    SELECT idEvento, fechaEvento, lugarEvento, evento, descEvento, tipoEvento
    FROM eventos
    ORDER BY fechaEvento ASC
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener eventos:', err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    // Mapear campos si necesitas nombres consistentes con el frontend
    const eventos = results.map((row) => ({
      id: row.idEvento,
      fechaEvento: row.fechaEvento,
      lugarEvento: row.lugarEvento,
      evento: row.evento,
      descEvento: row.descEvento,
      tipoEvento: row.tipoEvento,
    }));

    res.status(200).json(eventos);
  });
};
