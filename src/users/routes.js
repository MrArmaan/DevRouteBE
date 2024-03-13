const { Router } = require("express");
const userRouter = Router();

const {
  login,
  hashPass,
  comparePass,
  tokenCheck,
} = require("../middleware/auth");

const { addProfile } = require("../profiles/controllers");

const { signup, getAllUsers, getUser } = require("./controllers");

const { deleteUser } = require("./controllers");

userRouter.post("/users/signup", hashPass, signup);
userRouter.post("/users/login", comparePass, login);
userRouter.get("/users/authCheck", tokenCheck, login);

userRouter.get("/users/getUser", getUser);
userRouter.get("/users/getAllUsers", getAllUsers);

userRouter.delete("/users/deleteUser", deleteUser);

module.exports = userRouter;
