const CustomError = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class UnAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

const throwUnAuthorizedError = (message) => {
  return new UnAuthorizedError(message);
};

module.exports = throwUnAuthorizedError;
