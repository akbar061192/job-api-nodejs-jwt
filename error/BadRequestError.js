const CustomError = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

const throwBadRequestError = (message) => {
  return new BadRequestError(message);
};

module.exports = throwBadRequestError;
