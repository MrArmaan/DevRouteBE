require("dotenv").config();
const express = require("express");
const User = require("./users/model");
const Profile = require("./profiles/model");
const userRouter = require("./users/routes");
const profileRouter = require("./profiles/routes");
const cors = require("cors");

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(profileRouter);

const syncTables = async () => {
  User.hasOne(Profile);
  Profile.belongsTo(User);

  Profile.sync();
  User.sync();
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});
