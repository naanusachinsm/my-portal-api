const JWT = require('jsonwebtoken');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

const validateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    }
    try {
        const verifiedToken = JWT.verify(token, process.env.TOKEN_SECRET);
        req.user = verifiedToken;
        next();
    } catch(e) {
        res.status(StatusCodes.BAD_REQUEST).send('Invalid token');
    }
}

module.exports = validateToken;
