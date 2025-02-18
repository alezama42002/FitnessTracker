import body from "express-validator";
import axios from "axios";
import dotenv from "dotenv";
import userService from "../services/userService.js"; // Imports quieres/mutations related to User

dotenv.config();

// Calculates the maintainence calories of a user based on information given.
// Also determines macros based on the users fitness/health goals.
const getMacros = (req, res) => {
  const { weight, height, age, gender, activityLevel, goal } = req.body;
  let maintenanceCalories;
  let caloriesIntake;
  let proteinIntake;
  let carbIntake;
  let fatIntake;
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

  maintenanceCalories = Math.round(maintenanceCalories);

  switch (goal) {
    case "Relaxed Weight Loss":
      caloriesIntake = maintenanceCalories - 250;
      break;
    case "Normal Weight Loss":
      caloriesIntake = maintenanceCalories - 500;
      break;
    case "Relaxed Weight Gain":
      caloriesIntake = maintenanceCalories + 250;
      break;
    case "Normal Weight Gain":
      caloriesIntake = maintenanceCalories + 500;
      break;
  }

  proteinIntake = Math.round((maintenanceCalories * 0.25) / 4);
  carbIntake = Math.round((maintenanceCalories * 0.45) / 4);
  fatIntake = Math.round((maintenanceCalories * 0.3) / 9);

  res.json({
    CaloriesIntake: caloriesIntake,
    ProteinIntake: proteinIntake + "g",
    CarbohydrateIntake: carbIntake + "g",
    FatIntake: fatIntake + "g",
  });
};

// Adds food to the database by using ID of food
const addFoodById = async (req, res) => {
  const { id, userID } = req.body;

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
    const foodData = {
      userID: response.data.user_id || "Unknown User",
      foodData: {
        foodName: response.data.food.food_name || "Unknown Food",
        servingSize: food.serving_size || 100, // Defaulting to 100 if undefined
        Calories: food.calories ?? 0,
        Protein: food.protein ?? 0,
        Carbohydrates: food.carbohydrates ?? 0,
        Fats: food.fats ?? 0,
        Fiber: food.fiber ?? 0,
        VitaminA: food.vitamin_a ?? 0,
        VitaminB1: food.vitamin_b1 ?? 0,
        VitaminB2: food.vitamin_b2 ?? 0,
        VitaminB3: food.vitamin_b3 ?? 0,
        VitaminB5: food.vitamin_b5 ?? 0,
        VitaminB6: food.vitamin_b6 ?? 0,
        VitaminB9: food.vitamin_b9 ?? 0,
        VitaminB12: food.vitamin_b12 ?? 0,
        VitaminC: food.vitamin_c ?? 0,
        VitaminD: food.vitamin_d ?? 0,
        VitaminE: food.vitamin_e ?? 0,
        VitaminK: food.vitamin_k ?? 0,
        Calcium: food.calcium ?? 0,
        Chlorine: food.chlorine ?? 0,
        Copper: food.copper ?? 0,
        Iron: food.iron ?? 0,
        Iodine: food.iodine ?? 0,
        Potassium: food.potassium ?? 0,
        Magnesium: food.magnesium ?? 0,
        Manganese: food.manganese ?? 0,
        Sodium: food.sodium ?? 0,
        Phosphorus: food.phosphorus ?? 0,
        Selenium: food.selenium ?? 0,
        Zinc: food.zinc ?? 0,
      },
    };

    userService.addFoodforUser(userID, foodData);
    res.send("Food Logged!");
  } catch (error) {}
};

// Adds user to database based on given user information.
const addUser = async (req, res) => {
  const userData = req.body;

  userService.addUser(userData);

  res.send("User added!");
};

export default { getMacros, addFoodById, addUser };
