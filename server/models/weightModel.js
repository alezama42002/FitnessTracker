import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Schema for userFood junction table
const Weight = sequelize.define("Weight", {
  weightID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  logDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Weight;
