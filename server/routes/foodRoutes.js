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
  validateGetFood,
} from "../middleware/foodEndpointsValidator.js";
import { authenticateUser } from "../middleware/authentication.js";
import rateLimiter from "../middleware/rateLimiter.js";

// Searches for specific food in database and if not present give ability to enter
router.post(
  "/Search",
  rateLimiter,
  validateSearch,
  foodController.searchFoodByName
);

// Adds food to database
router.post(
  "/AddFood",
  rateLimiter,
  authenticateUser,
  validateAddFood,
  foodController.addFood
);

// Deletes food from database
router.delete(
  "/DeleteFood",
  rateLimiter,
  authenticateUser,
  validateDeleteFood,
  foodController.deleteFood
);

// Edit food's nutritional values in the database
router.patch(
  "/EditFood",
  rateLimiter,
  authenticateUser,
  validateEditFood,
  foodController.editFood
);

// Recommend Foods based on requirements from user such as "High Protein"
router.post(
  "/Recommend",
  rateLimiter,
  validateRecommend,
  foodController.recommendFood
);

// Gets specific food from database
router.post(
  "/GetFood",
  rateLimiter,
  validateGetFood,
  foodController.getFoodByName
);

export default router;
