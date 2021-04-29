const { userDb } = require('../db');
const { CustomError } = require('../utils/error');
const { userRegisterValidation } = require('../utils/validator');
const bcrypt = require('bcrypt');
const { ReasonPhrases } = require('http-status-codes');

const createUser = async (user) => {
    try {
        const validate = await userRegisterValidation(user);
        const userExist = await userDb.getUserByEmailDB(user.email);
        if (userExist) {
            throw new CustomError(ReasonPhrases.CONFLICT, 'An account with that email already exists');
        }
        const hashedPassword = await bcrypt.hashSync(user.password, 10);
        user.password = hashedPassword;
        return await userDb.createUserDB(user);
    } catch(e) {
        if(e.name  === 'ValidationError')
            throw new CustomError('ValidationError', e.details[0].message)
        if(e.name  === ReasonPhrases.BAD_REQUEST)
            throw e;
        if(e.name  === ReasonPhrases.CONFLICT)
            throw e;
        if(e.name  === 'MongoError')
            throw e;
    }
}

const getAllUsers = async () => {
    try {
        return await userDb.getAllUsersDB();
    } catch(e) {
        throw e;
    }
}

const getUserById = async (id) => {
    try {
        return await userDb.getUserByIdDB(id)
    } catch(e) {
        throw e;
    }
}

const getUserByEmail = async (email) => {
    try {
        return await userDb.getUserByEmailDB(email)
    } catch(e) {
        throw e;
    }
}

const deleteUserById = async (id) => {
    try {
        return await userDb.deleteUserByIdDB(id)
    } catch(error) {
        throw error
    }
}

const updateUserById = async (id, data) => {
    try {
        return await userDb.updateUserByIdDB(id, data)
    } catch(e) {
        throw error
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    deleteUserById,
    updateUserById
}
