import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

// Schema for Recipe table
const Recipe = sequelize.define("Recipe", {
  recipeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  Description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  recipeName: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  totalServings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCalories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalProtein: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCarbs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalFats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalFiber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminB6: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminB12: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminC: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminD: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminE: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminK: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCalcium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalIron: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalMagnesium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPotassium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalSodium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalZinc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Recipe;
