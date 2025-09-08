const connection = require('../models/db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

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

module.exports.login = (req, res) => {
    const { documento, password } = req.body;
    const consult = 'SELECT * FROM usuarios WHERE documento = ?';

    try {
        connection.query(consult, [documento], async  (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length === 0) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const payload = {
                nombre: user.nombre,
                documento: user.documento,
                fechaNacimiento: user.fechaNacimiento,
                email: user.email,
                idRol: user.idTipoUsuario
            };

            // En el token incluyes el email y el idTipoUsuario como rol
            const token = jwt.sign(payload, "Stack", {
                expiresIn: '30s' //expira en 30 segundos
            });

            res.send({ token });
        })
    } catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports.register = async (req, res) => {
    const { documento, nombre, email, fechaNacimiento, password, idTipoUsuario } = req.body;

    if (!documento || !nombre || !email || !fechaNacimiento || !password || !idTipoUsuario) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    try {
        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Consulta para insertar usuario
        const query = `
      INSERT INTO usuarios (documento, nombre, email, fechaNacimiento, password, idTipoUsuario)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

        connection.query(query, [documento, nombre, email, fechaNacimiento, hashedPassword, idTipoUsuario], (err, result) => {
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

module.exports.editUser = (req, res) => {
    const { documento, nombre, email, fechaNacimiento, idTipoUsuario } = req.body;

    // Validar rol (solo idTipoUsuario === 1 puede editar)
    if (idTipoUsuario !== 1) {
        return res.status(403).json({ message: 'No autorizado para editar usuario' });
    }

    // Validar campos obligatorios para la edición
    if (!documento || !nombre || !email || !fechaNacimiento) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const query = `
    UPDATE usuarios SET nombre = ?, email = ?, fechaNacimiento = ?
    WHERE documento = ?
  `;

    connection.query(query, [nombre, email, fechaNacimiento, documento], (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({ message: 'Error en la base de datos' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
    });
};