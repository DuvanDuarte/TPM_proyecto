const connection = require('../models/db');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
    const { documento, nombre, fechaNacimiento, password, idTipoUsuario } = req.body;

    if (!documento || !nombre || !fechaNacimiento || !password || !idTipoUsuario) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    try {
        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Consulta para insertar usuario
        const query = `
      INSERT INTO usuarios (documento, nombre, fechaNacimiento, pass, idTipoUsuario)
      VALUES (?, ?, ?, ?, ?)
    `;

        connection.query(query, [documento, nombre, fechaNacimiento, hashedPassword, idTipoUsuario], (err, result) => {
            if (err) {
                console.error('Error al crear usuario:', err);
                return res.status(500).json({ message: 'Error al crear usuario' });
            }
            res.status(201).json({ message: 'Usuario creado correctamente', userId: result.insertId });
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};