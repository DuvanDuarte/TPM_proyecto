const express = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController')
const userController = require('../controllers/userController');
const trainingController = require('../controllers/trainingController');
const eventController = require('../controllers/eventController');

// Ruta para crear evento

router.get('/ping', ping);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/editUser', userController.editUser);
router.get('/users', userController.getAllUsers);

router.post('/createTraining', trainingController.createTraining);
router.get('/entrenamientos', trainingController.getAllTrainings);

router.post('/createEvento', eventController.createEvento);
router.get('/eventos', eventController.getEventos);

module.exports = router;