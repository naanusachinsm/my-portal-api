const express = require('express');
const userRouter = express.Router();
const { userController } = require('../controllers');

userRouter.post('/users', userController.createUser);
userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:id', userController.getUserById);
userRouter.get('/users/getUserByEmail/:email', userController.getUserByEmail);
userRouter.put('/users/:id', userController.updateUserById);
userRouter.delete('/users/:id', userController.deleteUserById);

module.exports = userRouter;
