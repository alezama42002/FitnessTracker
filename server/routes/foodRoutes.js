import express from "express";
const router = express.Router();

// Controller functions for foodRoutes
import foodController from "../controllers/foodController.js";

// Searches for specific food in database and if not present give ability to enter
router.get("/Search", foodController.searchFoodByName);

// Adds food to database
router.post("/Add", foodController.addFood);

// Deletes food from database
router.delete("/Remove", foodController.removeFood);

// Edits foods' nutritional values in the database
router.patch("/Edit", foodController.modifyFood);

export default router;
