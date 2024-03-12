const { Router } = require("express");
const userRouter = Router();

const { hashPass, comparePass } = require("../middleware/auth");

const { addProfile } = require("../profiles/controllers");

const { signup, login, getAllUsers, getUser } = require("./controllers");

userRouter.post("/users/signup", signup, hashPass);

userRouter.post("/users/login", login, comparePass);

userRouter.get("/users/getUser", getUser);

userRouter.get("/users/getAllUsers", getAllUsers);

module.exports = userRouter;
