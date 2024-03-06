const { Router } = require("express");
const userRouter = Router();

const { signup } = require("./controllers");

const { hashPass, comparePass } = require("../middleware/auth");

userRouter.post("/users/signup", signup);

module.exports = userRouter;
