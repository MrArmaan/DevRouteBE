const { DataTypes } = require("sequelize");
const sequelize = require("../db/connections");

const Profile = sequelize.define("Profile", {
  profile1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profile2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profile3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = User;
