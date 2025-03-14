import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Schema for userFood junction table
const userFood = sequelize.define("userFood", {
  userFood_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  foodID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  Quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default userFood;
