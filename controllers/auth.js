const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnAuthorizedError } = require("../error");

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const { name: userName, email: userEmail } = user;
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    user: { name: userName, email: userEmail },
    token,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(BadRequestError("Email and Password are required."));
  }

  const user = await User.findOne({ email });
  const isMatch = await user.comparePassword(password);

  if (!user || !isMatch) {
    return next(UnAuthorizedError("Invalid Credentials"));
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    success: true,
    user: { name: user.name, email: user.email },
    token,
  });
};

module.exports = { registerUser, loginUser };
