// The following file's purpose is to connect specific requests to certain controllers which
// will handle the respective endpoint logic.

import express from "express";
const router = express.Router();

// Imports the usersController functions in order to use in endpoint declarations
import userController from "../controllers/userController.js";

// Return total Calories and Macros user should be consuming for goal
router.get("/Macros", userController.getMacros);

// Adds user to the database
router.post("/AddUser", userController.addUser);

// Logs food for user
router.post("/LogFood", userController.logFood);

export default router;
