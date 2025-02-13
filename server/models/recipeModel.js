import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Recipe = sequelize.define("Recipe", {
  recipeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  recipeDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  recipeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredientID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
  totalCalories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalProtein: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalFats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCarbs: {
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
  totalVitaminB: {
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
  totalPhosporus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalMagnesium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalSodium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPotassium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalIron: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalZinc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalCopper: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Meal;
