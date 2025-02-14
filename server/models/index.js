import User from "./userModel.js";
import Food from "./foodModel.js";
import Recipe from "./recipeModel.js";
import userFood from "./userFoodModel.js";
import recipeFood from "./recipeFoodModel.js";
import sequelize from "../config/database.js";

// Each user can have multiple foods through userFoods
User.hasMany(userFood, { foreignKey: "userID" });
userFood.belongsTo(User, { foreignKey: "userID" });

// Each food belongs to multiple users through userFoods
Food.hasMany(userFood, { foreignKey: "foodID" });
userFood.belongsTo(Food, { foreignKey: "foodID" });

// Each recipe can have multiple foods through recipeFoods
Recipe.hasMany(recipeFood, { foreignKey: "recipeID" });
recipeFood.belongsTo(Recipe, { foreignKey: "recipeID" });

// Each food belongs to multiple recipes through recipeFoods
Food.hasMany(recipeFood, { foreignKey: "foodID" });
recipeFood.belongsTo(Food, { foreignKey: "foodID" });

sequelize.sync();
