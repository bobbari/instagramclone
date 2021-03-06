const jwt = require("jsonwebtoken");
const privateKey = require("../config/constents");

const requireLogin = (req, resp, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return resp
      .status(401)
      .json({ message: "Please provide authorization token" });
  }
  jwt.verify(authorization, privateKey.privateKey, (err, result) => {
    if (err) {
      return resp.status(422).json({ message: "Invalid token" });
    }
    if (result) {
      req.tokenData = result.user;
      next();
    }
  });
};

module.exports = requireLogin;
