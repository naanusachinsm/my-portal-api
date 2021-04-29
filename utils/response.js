class SuccessResponse {
    constructor(statusCode, data, message = '') {
      this.message = message;
      this.statusCode = statusCode;
      this.data = data;
      this.getResponseObject();
    }

    getResponseObject() {
      return {
        statusCode: this.statusCode,
        message: this.message,
        data: this.data
      }
    }
}

class ErrorResponse {
    constructor(statusCode, message = '') {
      this.message = message;
      this.statusCode = statusCode;
      this.getResponseObject();
    }

    getResponseObject() {
      return {
        statusCode: this.statusCode,
        message: this.message
      }
    }
}

module.exports = {
    SuccessResponse,
    ErrorResponse
};
