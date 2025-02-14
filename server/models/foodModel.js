import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database";

const Food = sequelize.define("Food", {
  foodID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  servingSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  carbs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  protein: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fiber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vitaminA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vitaminB: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vitaminC: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vitaminD: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vitaminE: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vitaminK: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  calcium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phosphorus: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  magnesium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sodium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  potassium: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  iron: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  zinc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  copper: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Food;
