const Joi = require('joi');
var Regex = require('../utils/regex');

const userRegisterValidation = async (user) => {
    const userRegisterSchema = Joi.object({
        firstName: Joi.string()
            .min(4)
            .max(255)
            .required()
            .pattern(new RegExp(Regex.FIRST_NAME_PATTERN)),
        lastName: Joi.string()
            .min(2)
            .max(255)
            .required()
            .pattern(new RegExp(Regex.LAST_NAME_PATTERN)),
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .alphanum()
            .min(6)
            .max(255)
            .required(),
        dob: Joi.date(),
        lastLoggedIn:  Joi.date(),
        gender: Joi.string()
            .min(3)
            .max(255)
    });
    return await userRegisterSchema.validateAsync(user);
}

const userLoginValidation = async (user) => {
    const userLoginSchema = Joi.object({
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .alphanum()
            .min(6)
            .max(255)
            .required()
    });
    return await userLoginSchema.validateAsync(user);
}

module.exports = {
    userLoginValidation,
    userRegisterValidation
}

