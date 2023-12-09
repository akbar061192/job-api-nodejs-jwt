const jwt = require("jsonwebtoken");
const { UnAuthorizedError } = require("../error");

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(UnAuthorizedError("Invalid Token"));
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email, userId } = decodedToken;
    req.user = { name, email, userId };
    next();
  } catch (error) {
    next(UnAuthorizedError("UnAuthorized"));
  }
};

module.exports = authentication;
