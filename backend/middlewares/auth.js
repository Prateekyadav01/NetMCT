const jwt = require("jsonwebtoken");
const userModel = require("../models/user.js");
const { log } = require("console");

const authMiddleware = async (req, res, next) => {
  log("token+=======>>>>>", req.cookies.token);
  try {
    const tokenFromHeaders = req.cookies.token;
    const data = jwt.verify(tokenFromHeaders, process.env.JWT_SECRET_KEY);
    // console.log(tokenFromHeaders);
    const payload = jwt.decode(tokenFromHeaders);
    const user = await userModel.findById(payload.id);
    log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Forbidden: " + error.message,
    });
  }
};

module.exports = authMiddleware;
