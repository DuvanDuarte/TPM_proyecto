const express = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController')
const { getAllUsers, login, register, editUser } = require('../controllers/userController');
const { createTraining } = require('../controllers/trainingController');

router.get('/ping', ping);
router.post('/login', login);
router.post('/register', register);
router.post('/editUser', editUser);
router.get('/users', getAllUsers);

router.post('/createTraining', createTraining);

module.exports = router;