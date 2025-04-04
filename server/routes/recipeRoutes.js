import express from "express";
const router = express.Router();

import recipeController from "../controllers/recipeController.js";
import {
  validateAddRecipe,
  validateDeleteRecipe,
  validateEditRecipe,
  validateGetRecipe,
  validateReccomend,
} from "../middleware/recipeEndpointsValidator.js";
import { authenticateUser } from "../middleware/authentication.js";

// Create recipe according to the information given by the user
router.post(
  "/AddRecipe",
  validateAddRecipe,
  authenticateUser,
  recipeController.createRecipe
);

// Deletes a recipe from the database based on information given by the user
router.delete(
  "/DeleteRecipe",
  validateDeleteRecipe,
  authenticateUser,
  recipeController.deleteRecipe
);

// Edits a recipe that already exists in the database according to the users
// sought after changes
router.patch(
  "/EditRecipe",
  validateEditRecipe,
  authenticateUser,
  recipeController.editRecipe
);

// Gets all recipes that have the given name from the user
router.post("/GetRecipe", validateGetRecipe, recipeController.getRecipeByName);

// Reccomends a list of recipes that meet the users macro request
router.post(
  "/Reccomend",
  validateReccomend,
  recipeController.getReccomendedRecipes
);

export default router;
