const connection = require('../models/db')
const jwt = require('jsonwebtoken')

module.exports.login = (req, res) => {
    const { documento, password } = req.body;
    const consult = 'SELECT * FROM usuarios WHERE documento = ? AND password = ?';

    try {
        connection.query(consult, [documento, password], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                const user = result[0];
                const payload = {
                    username: user.email,
                    idRol: user.idTipoUsuario
                };
                console.log(payload)

                // En el token incluyes el email y el idTipoUsuario como rol
                const token = jwt.sign(payload, "Stack", {
                    expiresIn: '30s' //expira en 30 segundos
                });
                res.send({ token });
            } else {
                res.status(401).json({ message: 'Usuario Equivocado' });
            }
        })
    } catch (e) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}