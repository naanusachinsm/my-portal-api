const { StatusCodes , ReasonPhrases } = require('http-status-codes');
const { ErrorResponse } = require('./response')

class CustomError extends Error {
    constructor(name, message, code='') {
        super(message,name);
        this.message = message;
        this.name = name;
        this.code = code;
        this.statusCode = '';
        this.setResponseCodeAndMessage();
    }

    setResponseCodeAndMessage() {
        switch (this.name) {
            case 'ValidationError' :
                this.statusCode = StatusCodes.BAD_REQUEST;
                break;
            case 'CastError' :
                this.statusCode = StatusCodes.BAD_REQUEST;
                break;
            case ReasonPhrases.CONFLICT :
                this.statusCode = StatusCodes.CONFLICT;
                this.message = `An account with that email already exists.`;
                break;
            default :
                this.statusCode = StatusCodes.BAD_REQUEST;
                break;
        }
    }
}

const handleErrors = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(new ErrorResponse(err.statusCode, err.message));
    } else {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
}

module.exports = {
    CustomError,
    handleErrors
};
