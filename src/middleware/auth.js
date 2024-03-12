const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../users/model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    console.log("req.body.password", req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    console.log("req.body.password after hash:", req.body.password);
    next();
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const comparePass = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // const withoutPassword = {
    //   id: user.id,
    //   username: user.username,
    //   email: user.email,
    // };

    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
//////////////////////////
const tokenCheck = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));

    if (!req.header("Authorization")) {
      throw new Error("no token passed");
    }

    const token = req.header("Authorization").replace("Bearer ", "");

    const decodedToken = await jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ where: { id: decodedToken.id } });

    if (!user) {
      res.status(401).json({ message: "Not Authorized" });
      return;
    }

    req.authCheck = user;

    next();
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
////////////////////////
module.exports = {
  hashPass: hashPass,
  comparePass: comparePass,
  tokenCheck: tokenCheck,
};
