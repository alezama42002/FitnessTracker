import dotenv from "dotenv";
import userService from "../services/userService.js";
import utilityFunctions from "../services/utilityFunctions.js";
import recipeService from "../services/recipeService.js";

dotenv.config();

// Calculates recipe macros and nutritional information and then adds to database
const createRecipe = async (req, res) => {
  const { foodsData, Username, recipeName, recipeDescription, totalServings } =
    req.body;

  try {
    const userID = (await userService.getUser(Username)).userID;
    let finalFoodIDs = [];

    for (const food of foodsData) {
      const foodID = await utilityFunctions.checkFood({
        foodID: food.foodID,
        servingSize: food.servingSize,
        foodName: food.foodName,
        foodBrand: food.foodBrand,
        Calories: food.Calories,
        Protein: food.Protein,
        Carbohydrates: food.Carbohydrates,
        Fats: food.Fats,
      });

      finalFoodIDs.push({
        foodID: foodID,
        Quantity: food.Quantity,
      });
    }

    const recipeMacros = await recipeService.calculateRecipeMacros(
      finalFoodIDs
    );

    await recipeService.createRecipe(
      recipeName,
      userID,
      recipeMacros,
      recipeDescription,
      totalServings
    );

    const recipe = await recipeService.getRecipe(recipeName);
    const recipeID = await recipe.recipeID;
    await recipeService.createRecipeFood(finalFoodIDs, recipeID);

    res.status(200).json(recipeMacros);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

const deleteRecipe = async (req, res) => {
  await recipeService.deleteRecipe(req.body.recipeName);

  res.status(204).send();
};

const editRecipe = async (req, res) => {
  const { updatedFields, recipeName } = req.body;

  await recipeService.editRecipe(updatedFields, recipeName);
  res.status(200).send();
};

const getRecipeByName = async (req, res) => {
  const recipe = await recipeService.getRecipe(req.body.recipeName);
  res.status(200).json({
    recipeName: recipe.recipeName,
    Calories: recipe.totalCalories,
    Protein: recipe.totalProtein,
    Carbs: recipe.totalCarbohydrates,
    Fat: recipe.totalFats,
  });
};

const getReccomendedRecipes = async (req, res) => {
  const recipes = await recipeService.getRecipes(req.body.macroRequest);

  res.status(200).json(recipes);
};

export default {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getRecipeByName,
  getReccomendedRecipes,
};
