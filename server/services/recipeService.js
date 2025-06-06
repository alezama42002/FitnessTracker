import foodService from "./foodService.js";
import Recipe from "../models/recipeModel.js";
import recipeFood from "../models/recipeFoodModel.js";
import userRecipe from "../models/userRecipeModel.js";
import { Sequelize } from "sequelize";

// Calculates the macros for a recipe by finding nutrition data
// of each food and then summing up the totals
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

  // Finds the micro and macro nutrients for each food in the recipe
  // and adds their totals to recipeMacros
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

// Creates a recipe according to the information that the user provides
const createRecipe = async (
  recipeName,
  userID,
  recipeMacros,
  description,
  totalServings
) => {
  const [recipe, created] = await Recipe.findOrCreate({
    where: { recipeName: recipeName },
    defaults: {
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
    },
  });

  return;
};

// Deletes a recipe that matches the name that the user provides
const deleteRecipe = async (recipeName) => {
  return await Recipe.destroy({
    where: {
      recipeName: recipeName,
    },
  });
};

// Edits a recipe according the the information given by the user
const editRecipe = async (updatedFields, recipeName) => {
  await Recipe.update(
    { ...updatedFields },
    {
      where: { recipeName: recipeName },
    }
  );
  return;
};

// Creates a connection between a recipe and a food (ingredient)
const createRecipeFood = async (foodIDs, recipeID) => {
  for (const foodID of foodIDs) {
    await recipeFood.create({
      recipeID: recipeID,
      foodID: foodID.foodID,
      Quantity: foodID.Quantity,
    });
  }
};

// Gets all of the recipes that match the name provided
const getRecipe = async (recipeName) => {
  return await Recipe.findAll({
    where: { recipeName: recipeName },
  });
};

// Gets all of the recipes that meet the macro requirements of the user
const getRecipes = async (MacroRequest) => {
  try {
    // Handle all of the different macro threshold options
    switch (MacroRequest) {
      case "All":
        return await Recipe.findAll();
      case "High Protein":
        return await Recipe.findAll({
          where: {
            totalProtein: {
              [Sequelize.Op.gt]: Sequelize.literal("totalCalories / 10"),
            },
          },
        });
      case "High Carb":
        return await Recipe.findAll({
          where: {
            totalCarbs: {
              [Sequelize.Op.gte]: 15,
            },
          },
        });
      case "Low Carb":
        return await Recipe.findAll({
          where: {
            totalCarbs: {
              [Sequelize.Op.lt]: 15,
            },
          },
        });
      case "Low Fat":
        return await Recipe.findAll({
          where: {
            totalFats: {
              [Sequelize.Op.lt]: 15,
            },
          },
        });
    }
  } catch (error) {
    console.error("Error getting recommended Recipes: ", error);
  }
};

const getSingleRecipe = async (recipeName, Calories) => {
  return await Recipe.findOne({
    where: {
      recipeName: recipeName,
      totalCalories: Calories,
    },
  });
};

const getUserRecipe = async (recipeID, userID, Servings) => {
  return await userRecipe.findOne({
    where: {
      recipeID: recipeID,
      userID: userID,
      Servings: Servings,
    },
  });
};

const getRecipeWithID = async (recipeID) => {
  const recipe = await Recipe.findOne({
    where: {
      recipeID: recipeID,
    },
  });

  if (recipe === null) {
    return null;
  }

  return recipe;
};

const getUserRecipeData = async (userRecipe_ID) => {
  const UserRecipe = await userRecipe.findOne({
    where: { userRecipe_ID: userRecipe_ID },
  });

  if (UserRecipe === null) {
    return null;
  }

  const recipeID = UserRecipe.recipeID;
  const userID = UserRecipe.userID;
  const recipeData = await getRecipeWithID(recipeID);

  const loggedRecipeNutritionData = {
    userID: userID,
    Quantity: UserRecipe.Servings,
    currentCalories: recipeData.totalCalories ?? 0,
    currentProtein: recipeData.totalProtein ?? 0,
    currentCarbohydrates: recipeData.totalCarbs ?? 0,
    currentFats: recipeData.totalFats ?? 0,
    currentFiber: recipeData.totalFiber ?? 0,
    currentVitaminA: recipeData.totalVitaminA ?? 0,
    currentVitaminB1: recipeData.totalVitaminB1 ?? 0,
    currentVitaminB2: recipeData.totalVitaminB2 ?? 0,
    currentVitaminB3: recipeData.totalVitaminB3 ?? 0,
    currentVitaminB5: recipeData.totalVitaminB5 ?? 0,
    currentVitaminB6: recipeData.totalVitaminB6 ?? 0,
    currentVitaminB9: recipeData.totalVitaminB9 ?? 0,
    currentVitaminB12: recipeData.totalVitaminB12 ?? 0,
    currentVitaminC: recipeData.totalVitaminC ?? 0,
    currentVitaminD: recipeData.totalVitaminD ?? 0,
    currentVitaminE: recipeData.totalVitaminE ?? 0,
    currentVitaminK: recipeData.totalVitaminK ?? 0,
    currentCalcium: recipeData.totalCalcium ?? 0,
    currentChlorine: recipeData.totalChlorine ?? 0,
    currentCopper: recipeData.totalCopper ?? 0,
    currentIron: recipeData.totalIron ?? 0,
    currentIodine: recipeData.totalIodine ?? 0,
    currentPotassium: recipeData.totalPotassium ?? 0,
    currentMagnesium: recipeData.totalMagnesium ?? 0,
    currentManganese: recipeData.totalManganese ?? 0,
    currentSodium: recipeData.totalSodium ?? 0,
    currentPhosphorus: recipeData.totalPhosphorus ?? 0,
    currentSelenium: recipeData.totalSelenium ?? 0,
    currentZinc: recipeData.totalZinc ?? 0,
  };

  return loggedRecipeNutritionData;
};

export default {
  calculateRecipeMacros,
  createRecipe,
  deleteRecipe,
  editRecipe,
  createRecipeFood,
  getRecipe,
  getRecipes,
  getSingleRecipe,
  getUserRecipe,
  getUserRecipeData,
};
