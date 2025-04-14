import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Schema for userFood junction table
const userRecipe = sequelize.define("userRecipe", {
  userRecipe_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  recipeID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  Servings: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default userRecipe;
