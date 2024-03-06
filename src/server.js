require("dotenv").config();
const express = require("express");
const User = require("./users/model");
const userRouter = require("./users/routes");
const cors = require("cors");

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());

app.use(express.json());

// app.use(userRouter);

const syncTables = async () => {
  User.sync();
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});
