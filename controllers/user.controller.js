const { userService } = require('../services');
const { StatusCodes }  =  require('http-status-codes');
const { SuccessResponse } = require('../utils/response')

const createUser = async (req, res, next) => {
    const user = req.body;
    try {
        const data = await userService.createUser(user);
        res.status(StatusCodes.CREATED).send(new SuccessResponse(StatusCodes.CREATED, data, 'User created successfully'));
    } catch(e) {
        next(e);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const data = await userService.getAllUsers();
        res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, data));
    } catch(e) {
        next(e);
    }
}

const userFilter = async (req, res, next) => {
    try {
        const data = await userService.userFilter();
        res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, data));
    } catch(e) {
        next(e);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const data = await userService.getUserById(req.params.id);
        if (data) {
            res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, data, 'User found'));
        } else {
            res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, data, 'User not found'));
        }
    } catch(e) {
        next(e);
    }
}

const getUserByEmail = async (req, res, next) => {
    try {
        const data = await userService.getUserByEmail(req.params.email);
        if (data) {
            res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, data, 'User found'));
        } else {
            res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, data, 'User not found'));
        }
    } catch(e) {
        next(e);
    }
}

const deleteUserById = async (req, res, next) => {
    try {
        const data = await userService.deleteUserById(req.params.id);
        if (data) {
            res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, data, 'User deleted successfully'));
        } else {
            res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, data, 'User not found'));
        }
    } catch(e) {
        next(e);
    }
}

const updateUserById = async (req, res, next) => {
    try {
        const data = await userService.updateUserById(req.params.id, req.body);
        console.log(data);
        res.status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, data, 'User updated successfully'));
    } catch(error) {
        next(error);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    deleteUserById,
    updateUserById,
    userFilter
}
