const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify authintication token
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Please login to access this route",
    });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id ");
    req.username = await User.findOne({ _id }).select("username");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = requireAuth;
