import express from "express";
const router = express.Router();

// Controller functions for foodRoutes
import foodController from "../controllers/foodController.js";

// Searches for specific food in database and if not present give ability to enter
router.get("/Search", foodController.searchFoodByName);

router.post("/Add", foodController.addFood);

router.delete("/Remove", foodController.removeFood);

export default router;
