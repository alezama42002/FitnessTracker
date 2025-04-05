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
} from "../middleware/userEndpointsValidator.js";
import { authenticateUser } from "../middleware/authentication.js";

// Logs in user and provides refreshToken and accessToken on succesfull login
router.post("/Login", validateLogin, userController.Login);

// Logs out user and deletes refreshToken from database
router.delete("/Logout", validateLogout, userController.Logout);

// Generate a new accessToken through the use of valid refreshToken
router.post("/Token", validateToken, userController.newToken);

// Checks if a accessToken is still valid or has passed its lifespan
router.post("/Valid", validateValid, userController.checkToken);

// Return total Calories and Macros user should be consuming for goal
router.post("/Macros", validateMacroRequest, userController.getMacros);

// Adds user to the database
router.post("/AddUser", validateAddUser, userController.addUser);

// Removes user from the database
router.delete(
  "/DeleteUser",
  authenticateUser,
  validateDeleteUser,
  userController.deleteUser
);

// Check if username is taken already
router.post("/Username", validateCheckUsername, userController.checkUsername);

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

// Edits logged food incase of an error
router.patch(
  "/EditLog",
  authenticateUser,
  validateEditLog,
  userController.editLog
);

// Delete log of food incase of an error
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

export default router;
