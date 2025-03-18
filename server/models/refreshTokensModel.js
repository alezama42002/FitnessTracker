import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

// Schema for User table
const refreshToken = sequelize.define("refreshToken", {
  tokenID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default refreshToken;
