import express from "express";
const router = express.Router();

// Controller functions for foodRoutes
import foodController from "../controllers/foodController.js";
import {
  validateSearch,
  validateAddFood,
  validateDeleteFood,
  validateEditFood,
  validateRecommend,
} from "../middleware/foodEndpointsValidator.js";
import { authenticateUser } from "../middleware/authentication.js";

// Searches for specific food in database and if not present give ability to enter
router.get("/Search", validateSearch, foodController.searchFoodByName);

// Adds food to database
router.post(
  "/AddFood",
  authenticateUser,
  validateAddFood,
  foodController.addFood
);

// Deletes food from database
router.delete(
  "/DeleteFood",
  authenticateUser,
  validateDeleteFood,
  foodController.deleteFood
);

// Edit food's nutritional values in the database
router.patch(
  "/EditFood",
  authenticateUser,
  validateEditFood,
  foodController.editFood
);

// Recommend Foods based on requirements from user such as "High Protein"
router.get("/Recommend", validateRecommend, foodController.recommendFood);

export default router;
