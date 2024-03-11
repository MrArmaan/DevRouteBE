const User = require("./model");
const express = require("express");
const router = express.Router();

const signup = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.user = user;

    // res.status(201).json({ message: "Welcome New User! ", user: user });
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

const login = async (req, res) => {
  try {
    res.status(200).json({ message: "login successful", user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// // Get user profile
// router.get("/profile/:userId", async (req, res) => {
//   try {
//     const user = await dbClient.db
//       .collection("users")
//       .findOne({ _id: ObjectId(req.params.userId) });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Update user profile
// router.patch("/profile/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { username, email } = req.body;

//     await dbClient.db
//       .collection("users")
//       .updateOne({ _id: ObjectId(userId) }, { $set: { username, email } });

//     const updatedUser = await dbClient.db
//       .collection("users")
//       .findOne({ _id: ObjectId(userId) });
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

const getUser = async (re, res) => {
  try {
    const users = await User.findOne();
    res.status(200).json({ message: "Here are all the users: ", users: users });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  signup: signup,
  getAllUsers: getAllUsers,
  login: login,
  getUser: getUser,
};
