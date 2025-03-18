import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Schema for User table
const User = sequelize.define("User", {
  userID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Height: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activityLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
