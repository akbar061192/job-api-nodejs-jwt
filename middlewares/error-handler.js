const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../error/");

const errorHandler = (err, req, res, next) => {
  let customErr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong! Please try again later.",
  };
  // if (err instanceof CustomError) {
  //   return res
  //     .status(err.statusCode)
  //     .json({ success: false, msg: err.message });
  // }

  if (err.code && err.code === 11000) {
    customErr.statusCode = StatusCodes.BAD_REQUEST;
    customErr.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field. Please choose other value`;
  }

  if (err.name === "ValidationError") {
    customErr.statusCode = StatusCodes.BAD_REQUEST;
    const fields = Object.keys(err.errors);
    customErr.msg = `Please provide ${fields} field(s)`;
  }

  if (err.name === "CastError") {
    customErr.statusCode = StatusCodes.BAD_REQUEST;
    customErr.msg = `No item found with id: ${err.value}`;
  }

  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, err });
  res.status(customErr.statusCode).json({ success: false, err: customErr.msg });
};

module.exports = errorHandler;
