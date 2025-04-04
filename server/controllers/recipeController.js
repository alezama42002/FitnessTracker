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

    // Checks to see if the food exists if not it's created
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

    // Calculates all of the macro/micro totals for the recipe
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

    // Creates the connections so that it can be determined which foods
    // belong to the recipe incase it's needed in the future
    const recipe = await recipeService.getRecipe(recipeName);
    const recipeID = await recipe.recipeID;
    await recipeService.createRecipeFood(finalFoodIDs, recipeID);

    res.status(200).json(recipeMacros);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Deletes recipe from the database based on the name given by the user
const deleteRecipe = async (req, res) => {
  try {
    await recipeService.deleteRecipe(req.body.recipeName);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Edits recipe in the database according to the changes given by the user
const editRecipe = async (req, res) => {
  const { updatedFields, recipeName } = req.body;

  try {
    await recipeService.editRecipe(updatedFields, recipeName);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Gets all recipes that have the name given by the user
const getRecipeByName = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipe(req.body.recipeName);

    const formattedRecipes = recipes.map((recipe) => ({
      recipeName: recipe.recipeName,
      totalServings: recipe.totalServings,
      Calories: recipe.totalCalories,
      Protein: recipe.totalProtein,
      Carbs: recipe.totalCarbohydrates || 0,
      Fat: recipe.totalFats,
    }));

    res.status(200).json(formattedRecipes);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Gets all recipes from database thats macros and micronutrients meet the
// requirements of the user
const getReccomendedRecipes = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipes(req.body.macroRequest);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

export default {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getRecipeByName,
  getReccomendedRecipes,
};
