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
  validateMacroRequest,
  validateAddUser,
  validateDeleteUser,
  validateLogFood,
  validateEditLog,
  validateDeleteLog,
  validateGetCurrentNutrition,
} from "../middleware/userEndpointsValidator.js";
import { authenticateUser } from "../middleware/authentication.js";

router.post("/Login", validateLogin, userController.Login);

router.delete("/Logout", validateLogout, userController.Logout);

router.post("/Token", validateToken, userController.newToken);

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

export default router;
