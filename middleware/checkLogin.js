const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../util/secretEnvData");

const checkLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or invalid");
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        throw new Error("JWT verification failed: " + err.message);
      }
      // Optionally, you can attach the decoded token to the request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = checkLogin;
