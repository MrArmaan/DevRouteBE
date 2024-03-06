const { Router } = require("express");
const userRouter = Router();

const { signup, login } = require("./controllers");

userRouter.post("/users/signup", signup);

userRouter.post("/users/login", login);

module.exports = userRouter;
