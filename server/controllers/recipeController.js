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

export default { createRecipe, deleteRecipe, editRecipe };
