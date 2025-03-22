import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Schema for Food table
const Food = sequelize.define("Food", {
  foodID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  foodBrand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foodName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servingSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Calories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Protein: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Carbohydrates: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Fats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Fiber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VitaminA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VitaminB6: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VitaminB12: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VitaminC: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VitaminD: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VitaminE: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  VitaminK: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Calcium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Iron: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Magnesium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Potassium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Sodium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Zinc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Food;
