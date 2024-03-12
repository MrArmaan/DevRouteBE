require("dotenv").config();
const express = require("express");
const User = require("./users/model");
const userRouter = require("./users/routes");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

let appliedJobs = [];

app.post("/api/applyForJob", (req, res) => {
  const { jobId } = req.body;

  if (!jobId) {
    return res.status(400).json({ error: "Job ID is required." });
  }

  if (appliedJobs.includes(jobId)) {
    return res.status(400).json({ error: "Job already applied for." });
  }

  appliedJobs.push(jobId);
  return res.status(200).json({ message: "Job application successful." });
});

const syncTables = async () => {
  Profile.hasOne(User);
  User.belongsTo(Profile);

  Profile.sync();
  User.sync();
};

app.use(userRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Server is running on port ${port}`);
});
