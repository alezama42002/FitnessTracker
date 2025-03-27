import express from "express";
const router = express.Router();

import recipeController from "../controllers/recipeController.js";

// Create recipe to be used/logged whenever
router.post("/AddRecipe", recipeController.createRecipe);

router.delete("/DeleteRecipe", recipeController.deleteRecipe);

router.patch("/EditRecipe", recipeController.editRecipe);

router.post("/GetRecipe", recipeController.getRecipeByName);

router.post("/Reccomend", recipeController.getReccomendedRecipes);

export default router;
