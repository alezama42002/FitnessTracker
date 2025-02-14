import User from "./userModel";
import Food from "./foodModel";
import Recipe from "./recipeModel";
import Ingredient from "./ingredientModel";

User.hasMany(userFood, { foreignKey: "userID" });
UserFood.belongsTo(User, { foreignKey: "userID" });

Food.hasMany(user);
