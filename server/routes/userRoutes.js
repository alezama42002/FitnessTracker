import express from "express";
const router = express.Router();

import userController from "../controllers/userController.js";

// Return total Calories and Macros user should be consuming for goal
router.get("/Macros", userController.getMacros);

export default router;
