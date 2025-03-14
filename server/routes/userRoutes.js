// The following file's purpose is to connect specific requests to certain controllers which
// will handle the respective endpoint logic.

import express from "express";
const router = express.Router();

// Imports the usersController functions in order to use in endpoint declarations
import userController from "../controllers/userController.js";
import {
  validateMacroRequest,
  validateAddUser,
  validateDeleteUser,
  validateLogFood,
  validateEditLog,
  validateDeleteLog,
  validateGetCurrentNutrition,
} from "../middleware/userEndpointsValidator.js";

// Return total Calories and Macros user should be consuming for goal
router.get("/Macros", validateMacroRequest, userController.getMacros);

// Adds user to the database
router.post("/AddUser", validateAddUser, userController.addUser);

// Removes user from the database
router.delete("/DeleteUser", validateDeleteUser, userController.deleteUser);

// Logs food for user
router.post("/LogFood", validateLogFood, userController.logFood);

// Edits logged food incase of an error
router.patch("/EditLog", validateEditLog, userController.editLog);

// Delete log of food incase of an error
router.delete("/DeleteLog", validateDeleteLog, userController.deleteLog);

// Get the users current nutritional total for the day
router.get(
  "/GetCurrentNutrition",
  validateGetCurrentNutrition,
  userController.getCurrentNutrition
);

export default router;
