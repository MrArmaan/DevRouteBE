const { Router } = require("express");
const userRouter = Router();

const { signup, login, getAllUsers } = require("./controllers");

const { hashPass, comparePass } = require("../middleware/auth");

userRouter.post("/users/signup", signup);

userRouter.post("/users/login", login);

userRouter.get("/users/getAllUsers", getAllUsers);

module.exports = userRouter;
