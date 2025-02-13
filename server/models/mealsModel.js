import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const Meal = sequelize.define("Meals", {
  mealID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mealCalories: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mealProtein: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mealCarbs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mealFats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Meal;
