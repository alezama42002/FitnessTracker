import body from "express-validator";
import axios from "axios";
import dotenv from "dotenv";
import { response } from "express";
import userService from "../services/userService.js"; // Imports quieres/mutations related to User

dotenv.config();

// Calculates the maintainence calories of a user based on information given.
// Also determines macros based on the users fitness/health goals.
const getMacros = (req, res) => {
  const { weight, height, age, gender, activityLevel } = req.body;
  let maintenanceCalories;
  let BMR;

  // Calculates BMR depending on given user information
  if (gender === "Male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calculate maintanence Calories based on BMR and activity level
  switch (activityLevel) {
    case "Sedentary":
      maintenanceCalories = 1.2 * BMR;
      break;
    case "Lightly Active":
      maintenanceCalories = 1.375 * BMR;
      break;
    case "Moderately Active":
      maintenanceCalories = 1.55 * BMR;
      break;
    case "Very Active":
      maintenanceCalories = 1.725 * BMR;
      break;
    case "Extra Active":
      maintenanceCalories = 1.9 * BMR;
      break;
    case "Professional Athlete":
      maintenanceCalories = 2.3 * BMR;
      break;
  }

  res.json({ MaintanenceCalories: maintenanceCalories });
};

// Adds food to the database by using ID of food
const addFoodById = async (req, res) => {
  const { id } = req.body;

  // Makes API call to FatSecret API to get foods nutritional information
  // so it can then be stored in database
  try {
    const response = await axios.get(
      "https://platform.fatsecret.com/rest/server.api",
      {
        params: {
          method: "food.get.v4",
          food_id: `${id}`,
          format: "json",
        },
        headers: {
          Authorization: `Bearer ${process.env.FATSECRET_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Gets second serving option or first in the case that second is not present
    const food =
      response.data.food.servings.serving[1] ||
      response.data.food.servings.serving[0];

    // Filter data to only get the information needed
    const filteredData = {
      name: response.data.food.food_name || "Unknown Food",
      calories: food.calories ?? "0",
      carbohydrates: food.carbohydrate ?? "0",
      protein: food.protein ?? "0",
      fats: food.fat ?? "0",
      sodium: food.sodium ?? "0",
      potassium: food.potassium ?? "0",
      fiber: food.fiber ?? "0",
      vitaminA: food.vitamin_a ?? "0",
      vitaminC: food.vitamin_c ?? "0",
      calcium: food.calcium ?? "0",
      iron: food.iron ?? "0",
    };

    res.send(filteredData);
  } catch (error) {}
};

// Adds user to database based on given user information.
const addUser = async (req, res) => {
  const userData = req.body;

  userService.addUser(userData);

  res.send("User added!");
};

// Logs food for user by adding food to database if not present and connects food to user
const logFood = async (req, res) => {
  const { userID, foodData } = req.body;

  userService.addFoodforUser(userID, foodData);

  res.send("Food Logged!");
};

export default { getMacros, addFoodById, addUser, logFood };
