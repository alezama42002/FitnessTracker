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
    foreignKey: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
});

export default Weight;
