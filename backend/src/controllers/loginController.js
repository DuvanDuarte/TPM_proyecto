const connection = require('../models/db')
const jwt = require('jsonwebtoken')

module.exports.login = (req, res) => {
    const {username, password} = req.body;
    const consult = 'SELECT * FROM usuarios WHERE email = ? AND pass = ?';

    try{
        connection.query(consult, [username, password], (err, result) => {
            if(err){
                res.send(err); 
            }

            if(result.length > 0){
                const token = jwt.sign({username}, "Stack", {
                    expiresIn: '30s' //expira en 3 minutos
                });
                res.send({token});
            } else {
                console.log('Usuario equivocado')
                res.send({message: 'Usuario Equivocado'})
            }
        })
    } catch (e) {

    }
}