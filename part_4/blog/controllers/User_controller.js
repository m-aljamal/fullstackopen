const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const { validationResult } = require("express-validator");

const createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {
      name: "vallidationError",
      message: errors.array()[0].msg,
    };
    return next(error);
  }
  const { userName, name, password } = req.body;
  let user = await User.findOne({ userName });

  if (user) {
    const error = {
      name: "UserIsAlredyExists",
      message: "User is alredy exists, please try with another name",
    };
    return next(error);
  }

  user = new User({
    userName,
    name,
    password,
    blogs: [],
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  const payload = {
    user: {
      id: user.id,
    },
  };
  jwt.sign(payload, config.JWT_KEY, { expiresIn: "1h" }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
};

const getLoggedInUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {
      name: "vallidationError",
      message: errors.array()[0].msg,
    };
    return next(error);
  }
  const { userName, password } = req.body;
  let user = await User.findOne({ userName });
  if (!user) {
    const error = {
      name: "userNotFound",
      message: "No user found, please sign up",
    };
    return next(error);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = {
      name: "wrongPassword",
      message: "wrong password",
    };
    return next(error);
  }
  const payload = {
    user: {
      id: user.id,
    },
  };
  jwt.sign(payload, config.JWT_KEY, { expiresIn: "2h" }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
};

const getAllUser = async (req, res) => {
  const users = await User.find({})
    .select("-password")
    .populate("blogs", { likes: 1, author: 1, title: 1, url: 1 });
  res.json(users);
};
module.exports = {
  getAllUser,
  createUser,
  login,
  getLoggedInUser,
};
