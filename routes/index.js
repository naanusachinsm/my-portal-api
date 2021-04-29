const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { authenticationController } = require('../controllers');
const validateToken = require('../utils/verifytoken');

router.post('/users', userController.createUser);
router.get('/users', validateToken, userController.getAllUsers);
router.get('/users/:id', validateToken, userController.getUserById);
router.get('/users/getUserByEmail/:email', validateToken, userController.getUserByEmail);
router.put('/users/:id', validateToken, userController.updateUserById);
router.delete('/users/:id', validateToken, userController.deleteUserById);

router.post('/login', authenticationController.userLogin);


module.exports = router;
