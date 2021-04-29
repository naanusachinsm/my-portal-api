const { StatusCodes }  =  require('http-status-codes');
const User = require('../models/user.model');
const { CustomError } = require('../utils/error');

const createUserDB = async (user) => {
    try {
        return await User.create(user);
    } catch(e) {
        console.error(e);
        throw new CustomError(e.name, e.message, e.code);
    }
}

const getAllUsersDB = async () => {
    try {
        return await User.find({});
    } catch(e) {
        console.error(e);
        throw new CustomError(e.name, e.message);
    }
}

const userFilterDB = async () => {
    try {
        return await User.find({});
    } catch(e) {
        console.error(e);
        throw new CustomError(e.name, e.message);
    }
}

const getUserByEmailDB = async (email) => {
    try {
        return await User.findOne({ email: email })
    } catch(e) {
        console.error(e);
        throw new CustomError(e.name, e.message);
    }
}


const getUserByIdDB = async (id) => {
    try {
        return await User.findById(id);
    } catch(e) {
        console.error(e);
        throw new CustomError(e.name, e.message);
    }
}

const deleteUserByIdDB = async (id) => {
    try {
        return await User.findOneAndDelete({ _id: id });
    } catch(e) {
        console.error(e);
        throw new CustomError(e.name, e.message);
    }
}

const updateUserByIdDB = async (id, data) => {
    try {
        return await User.findByIdAndUpdate({ _id: id }, data, { new: true });
    } catch(e) {
        console.error(e);
        throw new CustomError(e.name, e.message);
    }
}

module.exports = {
    createUserDB,
    getAllUsersDB,
    getUserByIdDB,
    getUserByEmailDB,
    deleteUserByIdDB,
    updateUserByIdDB,
    userFilterDB
}
