const { authenticationService } = require('../services');
const { StatusCodes }  =  require('http-status-codes');
const { SuccessResponse } = require('../utils/response')

const userLogin = async (req, res, next) => {
    const user = req.body;
    try {
        const token = await authenticationService.userLogin(user);
        res.header('Authorization', token).status(StatusCodes.OK).send(new SuccessResponse(StatusCodes.OK, token, 'User loggedIn successfully'));
    } catch(e) {
        next(e);
    }
}

module.exports = {
    userLogin
}
