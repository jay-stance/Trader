const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json([{ errors: "Access Denied, No Token Given" }]);

  try {
    // verify the token
    req.user = jwt.verify(token, config.get("jwtPrivateKey"));
    next();
  } catch (err) {
    return res.status(400).json([{ errors: "Invalid Token" }]);
  }
};
