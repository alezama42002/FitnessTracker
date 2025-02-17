import express from "express";
const router = express.Router();

import recipecontroller from "../controllers/recipecontroller";

// Create recipe to be used/logged whenever
router.post("/Create", recipecontroller.createRecipe);

export default router;
