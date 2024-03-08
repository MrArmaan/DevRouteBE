const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass } = require("../middleware/auth");

const { signup, login, getAllUsers, getUser } = require("./controllers");

userRouter.post("/users/signup", signup);

userRouter.post("/users/login", login);

userRouter.get("/users/getUser", getUser);

userRouter.get("/users/getAllUsers", getAllUsers);

module.exports = userRouter;
