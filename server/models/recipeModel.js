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
  ingredientID: {
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
  totalVitaminB1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminB2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminB3: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminB5: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminB6: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalVitaminB9: {
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
  totalChlorine: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCopper: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalIron: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalIodine: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPotassium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalMagnesium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalManganese: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalSodium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalSelenium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalZinc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Recipe;
