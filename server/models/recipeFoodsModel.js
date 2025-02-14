import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database";

const recipeFoods = sequelize.define("recipeFoods", {
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
    quantity: {
        type: DataTypes.INTEGER,
    },
})