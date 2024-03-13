const User = require("../users/model");
const Profile = require("./model");
const express = require("express");
const router = express.Router();

const addProfile = async (req, res) => {
  try {
    const profile = await Profile.create({
      profile1: req.body.profile1,
      profile2: req.body.profile2,
      profile3: req.body.profile3,
    });
    // const updatedUser = await User.update(
    //   { ProfileId: profile.id },
    //   { where: { id: req.user.id } }
    // );
    res.status(201).json({ message: "Welcome New User!", profile: profile });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const profile = await Profile.findAll();
    res
      .status(200)
      .json({ message: "Here are all the Profiles: ", profile: profile });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  addProfile: addProfile,
  getAllProfiles: getAllProfiles,
};
