import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database";

const Ingredient = sequelize.define("Ingredient", {
  ingredientID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  foodID: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
});
