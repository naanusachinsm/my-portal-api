const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { authenticationController } = require('../controllers');
const validateToken = require('../utils/verifytoken');
const paginatedResults = require('../utils/paginatedResults');
const User = require('../models/user.model');

router.post('/users', userController.createUser);
router.get('/allUsers', validateToken, userController.getAllUsers);
router.get('/users', validateToken, paginatedResults(User));
router.get('/users/:id', validateToken, userController.getUserById);
router.get('/users/getUserByEmail/:email', validateToken, userController.getUserByEmail);
router.put('/users/:id', validateToken, userController.updateUserById);
router.delete('/users/:id', validateToken, userController.deleteUserById);

router.post('/login', authenticationController.userLogin);
router.get('/getAnonymousToken', authenticationController.getAnonymousToken);


module.exports = router;
