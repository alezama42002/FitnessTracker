import foodService from "./foodService.js";
import Recipe from "../models/recipeModel.js";
import { Sequelize } from "sequelize";

const calculateRecipeMacros = async (foodIDs) => {
  const recipeMacros = {
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFats: 0,
    totalFiber: 0,
    totalVitaminA: 0,
    totalVitaminB6: 0,
    totalVitaminB12: 0,
    totalVitaminC: 0,
    totalVitaminD: 0,
    totalVitaminE: 0,
    totalVitaminK: 0,
    totalCalcium: 0,
    totalIron: 0,
    totalMagnesium: 0,
    totalPotassium: 0,
    totalSodium: 0,
    totalZinc: 0,
  };

  for (const foodID of foodIDs) {
    const food = await foodService.getFood(foodID.foodID);

    if (food) {
      const quantity = foodID.Quantity || 1;

      recipeMacros.totalCalories += (food.Calories || 0) * quantity;
      recipeMacros.totalProtein += (food.Protein || 0) * quantity;
      recipeMacros.totalCarbs += (food.Carbohydrates || 0) * quantity;
      recipeMacros.totalFats += (food.Fats || 0) * quantity;
      recipeMacros.totalFiber += (food.Fiber || 0) * quantity;
      recipeMacros.totalVitaminA += (food.VitaminA || 0) * quantity;
      recipeMacros.totalVitaminB6 += (food.VitaminB6 || 0) * quantity;
      recipeMacros.totalVitaminB12 += (food.VitaminB12 || 0) * quantity;
      recipeMacros.totalVitaminC += (food.VitaminC || 0) * quantity;
      recipeMacros.totalVitaminD += (food.VitaminD || 0) * quantity;
      recipeMacros.totalVitaminE += (food.VitaminE || 0) * quantity;
      recipeMacros.totalVitaminK += (food.VitaminK || 0) * quantity;
      recipeMacros.totalCalcium += (food.Calcium || 0) * quantity;
      recipeMacros.totalIron += (food.Iron || 0) * quantity;
      recipeMacros.totalMagnesium += (food.Magnesium || 0) * quantity;
      recipeMacros.totalPotassium += (food.Potassium || 0) * quantity;
      recipeMacros.totalSodium += (food.Sodium || 0) * quantity;
      recipeMacros.totalZinc += (food.Zinc || 0) * quantity;
    }
  }

  return recipeMacros;
};

const createRecipe = async (
  recipeName,
  userID,
  recipeMacros,
  description,
  totalServings
) => {
  return await Recipe.create({
    userID: userID,
    Description: description,
    recipeName: recipeName,
    totalServings: totalServings,
    totalCalories: recipeMacros.totalCalories,
    totalProtein: recipeMacros.totalProtein,
    totalCarbs: recipeMacros.totalCarbs,
    totalFats: recipeMacros.totalFats,
    totalFiber: recipeMacros.totalFiber,
    totalVitaminA: recipeMacros.totalVitaminA,
    totalVitaminB6: recipeMacros.totalVitaminB6,
    totalVitaminB12: recipeMacros.totalVitaminB12,
    totalVitaminC: recipeMacros.totalVitaminC,
    totalVitaminD: recipeMacros.totalVitaminD,
    totalVitaminE: recipeMacros.totalVitaminE,
    totalVitaminK: recipeMacros.totalVitaminK,
    totalCalcium: recipeMacros.totalCalcium,
    totalIron: recipeMacros.totalIron,
    totalMagnesium: recipeMacros.totalMagnesium,
    totalPotassium: recipeMacros.totalPotassium,
    totalSodium: recipeMacros.totalSodium,
    totalZinc: recipeMacros.totalZinc,
  });
};

const deleteRecipe = async (recipeName) => {
  return await Recipe.destroy({
    where: {
      recipeName: recipeName,
    },
  });
};

const editRecipe = async (updatedFields, recipeName) => {
  await Recipe.update(
    { ...updatedFields },
    {
      where: { recipeName: recipeName },
    }
  );
  return;
};

export default {
  calculateRecipeMacros,
  createRecipe,
  deleteRecipe,
  editRecipe,
};
