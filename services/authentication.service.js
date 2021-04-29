const { userDb } = require('../db');
const { CustomError } = require('../utils/error');
const { userLoginValidation, userRegisterValidation } = require('../utils/validator');
const bcrypt = require('bcrypt');
const { ReasonPhrases } = require('http-status-codes');
const JWT = require('jsonwebtoken');
const getUniqueId = require('../utils/uniqueCode');

const userLogin = async (user) => {
    try {
        const validate = await userLoginValidation(user);
        const userExist = await userDb.getUserByEmailDB(user.email);
        if (!userExist) {
            throw new CustomError(ReasonPhrases.BAD_REQUEST, 'User does not exist.');
        }
        const validatePassword = await bcrypt.compareSync(user.password, userExist.password);
        if(!validatePassword) {
            throw new CustomError(ReasonPhrases.BAD_REQUEST, 'Invalid password');
        }
        const token = JWT.sign({_id:userExist._id}, process.env.TOKEN_SECRET, { expiresIn: '3600s'});
        const updateLastLoggedIn = await userDb.updateUserByIdDB(userExist._id, { lastLoggedIn: Date.now()});
        return token;
    } catch(e) {
        if(e.name  === 'ValidationError')
            throw new CustomError('ValidationError', e.details[0].message)
        if(e.name  === ReasonPhrases.BAD_REQUEST)
            throw e;
    }
}

const getAnonymousToken = async () => {
    try {
        const token = JWT.sign({_id: getUniqueId()}, process.env.TOKEN_SECRET, { expiresIn: '1h'});
        return token;
    } catch(e) {
            throw e;
    }
}

module.exports = {
    userLogin,
    getAnonymousToken
}
