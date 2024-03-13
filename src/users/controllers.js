const User = require("./model");

const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const signup = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ message: "Welcome New User! ", user: user });
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllUsers = async (re, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "Here are all the users: ", users: users });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getUser = async (re, res) => {
  try {
    const users = await User.findOne();
    res.status(200).json({ message: "Here are all the users: ", users: users });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userToDestroy = await User.destroy({
      where: {
        username: req.body.username,
      },
    });

    console.log("user deleted:", userToDestroy);
    res.send({ message: "user deleted", userToDestroy: userToDestroy });
  } catch (error) {
    res.send({ message: "its gone pete tong", error: error });
  }
};

module.exports = {
  signup: signup,
  getAllUsers: getAllUsers,
  getUser: getUser,
  deleteUser: deleteUser,
};
