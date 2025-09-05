const express = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController')
const { login } = require('../controllers/loginController')
const { register } = require('../controllers/registerController');
const { getAllUsers } = require('../controllers/userController');

router.get('/ping', ping);
router.post('/login', login);
router.post('/register', register);
router.get('/users', getAllUsers);

module.exports = router;