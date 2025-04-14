// The following file's purpose is to connect specific requests to certain controllers which
// will handle the respective endpoint logic.

import express from "express";
const router = express.Router();

// Imports the usersController functions in order to use in endpoint declarations
import userController from "../controllers/userController.js";
import {
  validateLogin,
  validateLogout,
  validateToken,
  validateValid,
  validateMacroRequest,
  validateAddUser,
  validateDeleteUser,
  validateCheckUsername,
  validateGetUserFoods,
  validateLogFood,
  validateEditLog,
  validateDeleteLog,
  validateGetCurrentNutrition,
  validateLogWeight,
  validateGetWeights,
  validateLogRecipe,
  validateSetMacros,
  validateUserMacros,
  validateGetUserRecipes,
} from "../middleware/userEndpointsValidator.js";
import { authenticateUser } from "../middleware/authentication.js";
import rateLimiter from "../middleware/rateLimiter.js";

// Logs in user and provides refreshToken and accessToken on successful login
router.post("/Login", rateLimiter, validateLogin, userController.Login);

// Logs out user and deletes refreshToken from database
router.delete("/Logout", validateLogout, userController.Logout);

// Generate a new accessToken through the use of valid refreshToken
router.post("/Token", rateLimiter, validateToken, userController.newToken);

// Checks if a accessToken is still valid or has passed its lifespan
router.post("/Valid", validateValid, userController.checkToken);

// Return total Calories and Macros user should be consuming for goal
router.post("/Macros", validateMacroRequest, userController.getMacros);

// Adds user to the database
router.post("/AddUser", rateLimiter, validateAddUser, userController.addUser);

// Removes user from the database
router.delete(
  "/DeleteUser",
  authenticateUser,
  validateDeleteUser,
  userController.deleteUser
);

// Check if username is taken already
router.post(
  "/Username",
  rateLimiter,
  validateCheckUsername,
  userController.checkUsername
);

// Gets all of the users logged foods for the day
router.post(
  "/GetUserFoods",
  authenticateUser,
  validateGetUserFoods,
  userController.getFoods
);

// Logs food for user
router.post(
  "/LogFood",
  authenticateUser,
  validateLogFood,
  userController.logFood
);

// Edits logged food in case of an error
router.patch(
  "/EditLog",
  authenticateUser,
  validateEditLog,
  userController.editLog
);

// Delete log of food in case of an error
router.delete(
  "/DeleteLog",
  authenticateUser,
  validateDeleteLog,
  userController.deleteLog
);

// Get the users current nutritional total for the day
router.post(
  "/GetCurrentNutrition",
  authenticateUser,
  validateGetCurrentNutrition,
  userController.getCurrentNutrition
);

// Logs the users weight for the day
router.post(
  "/LogWeight",
  authenticateUser,
  validateLogWeight,
  userController.logWeight
);

// Gets the users total weight for the past week
router.post(
  "/GetWeights",
  authenticateUser,
  validateGetWeights,
  userController.getUserWeights
);

// Logs a recipe for the user and adjusts their nutrition and macro totals
router.post("/LogRecipe", validateLogRecipe, userController.logRecipe);

// Sets the users macros based on a new goal
router.patch(
  "/SetMacros",
  authenticateUser,
  validateSetMacros,
  userController.setMacros
);

// Gets the users goal macros
router.post(
  "/UserMacros",
  authenticateUser,
  validateUserMacros,
  userController.getUserMacros
);

// Gets the users logged recipes for the day
router.post(
  "/GetUserRecipes",
  authenticateUser,
  validateGetUserRecipes,
  userController.getUserRecipes
);

// Deletes the users logged recipe for the day
// Also adjusts their nutritional totals
router.delete(
  "/DeleteRecipeLog",
  authenticateUser,
  userController.deleteRecipeLog
);

// Edits the users logged recipe for the day
// Also adjusts their nutritional totals
router.patch("/EditRecipeLog", authenticateUser, userController.editRecipeLog);

// Generates new API key for the application, only admin is able to use this
router.get("/NewAPIKey", userController.newAPIKey);

export default router;
