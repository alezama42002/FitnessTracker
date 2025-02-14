import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Schema for recipeFood junction table
const recipeFood = sequelize.define("recipeFood", {
  recipeFood_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  recipeID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  foodID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default recipeFood;
