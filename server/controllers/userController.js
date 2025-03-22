import body from "express-validator";
import axios from "axios";
import dotenv from "dotenv";
import userService from "../services/userService.js"; // Imports quieres/mutations related to User
import foodService from "../services/foodService.js";
import utilService from "../services/utilService.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../middleware/authentication.js";

dotenv.config();

const Login = async (req, res) => {
  const user = await userService.getUser(req.body.Username);
  const user_ = { name: req.body.Username };

  if (user === null) return res.status(400).send("Cannot Find User");

  try {
    if (await bycrypt.compare(req.body.Password, user.Password)) {
      const accessToken = generateAccessToken(user_);
      const refreshToken = jwt.sign(user_, process.env.REFRESH_TOKEN_SECRET);
      await utilService.addToken(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

const Logout = (req, res) => {
  utilService.deleteToken(req.body.Token);
  res.sendStatus(204);
};

const newToken = (req, res) => {
  const refreshToken = req.body.Token;
  if (refreshToken === null) return res.sendStatus(401);
  if (utilService.findToken(refreshToken) == false) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
};

// Calculates the maintainence calories of a user based on information given.
// Also determines macros based on the users fitness/health goals.
const getMacros = (req, res) => {
  try {
    const { Weight, Height, Age, Gender, activityLevel, Goal } = req.body;

    let maintenanceCalories;
    let caloriesIntake;
    let proteinIntake;
    let carbIntake;
    let fatIntake;
    let BMR;

    // Calculates BMR depending on given user information
    if (Gender === "Male") {
      BMR = 10 * Weight + 6.25 * Height - 5 * Age + 5;
    } else {
      BMR = 10 * Weight + 6.25 * Height - 5 * Age - 161;
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

    switch (Goal) {
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

    proteinIntake = Math.round((caloriesIntake * 0.25) / 4);
    carbIntake = Math.round((caloriesIntake * 0.45) / 4);
    fatIntake = Math.round((caloriesIntake * 0.3) / 9);

    res.status(200).json({
      Calories: caloriesIntake + " kcal",
      Protein: proteinIntake + "g",
      Carbohydrates: carbIntake + "g",
      Fat: fatIntake + "g",
    });
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Adds user to database based on given user information.
const addUser = async (req, res) => {
  try {
    const userData = req.body;

    if ((await userService.getUserID(userData.Username)) != null) {
      res.status(409).json("Username is already taken");
    } else {
      userData.Password = await bycrypt.hash(req.body.Password, 10);
      await userService.addUser(userData);
      res.status(201).json("User added!");
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Deletes user from the database based on given information
const deleteUser = async (req, res) => {
  try {
    const { userID } = req.body;

    if ((await userService.userExists(userID)) === false) {
      res.status(404).json("User does not exist");
    } else {
      await userService.deleteUser(userID);
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Adds food to the database by using ID of food
const logFood = async (req, res) => {
  try {
    const {
      foodID,
      foodName,
      foodBrand,
      Calories,
      Protein,
      Carbohydrates,
      Fats,
      Username,
      Quantity,
    } = req.body;

    let finalFoodID;

    // Gets the necessary foodID for the given food based on the food wishing to be logged.
    // Foods key nutrtional information is used to find ID.
    const foodResponse = await foodService.getFoodID({
      foodName: foodName,
      foodBrand: foodBrand,
      Calories: Calories,
      Protein: Protein,
      Carbohydrates: Carbohydrates,
      Fats: Fats,
    });

    // If food is not already in our Database, we store food in Database
    if (foodResponse === false) {
      // Gets foods information via API call to FatSecret using foodID given through req.body
      const response = await axios.get(
        "https://platform.fatsecret.com/rest/server.api",
        {
          params: {
            method: "food.get.v4",
            food_id: `${foodID}`,
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
        foodBrand: response.data.food.brand_name || "Unknown Brand",
        Description: response.data.food.food_description || "",
        foodName: response.data.food.food_name || "Unknown Food",
        servingSize: food.metric_serving_amount || 1,
        Calories: food.calories ?? 0,
        Protein: food.protein ?? 0,
        Carbohydrates: food.carbohydrate ?? 0,
        Fats: food.fat ?? 0,
        Fiber: food.fiber ?? 0,
        VitaminA: food.vitamin_a ?? 0,
        VitaminB6: food.vitamin_b6 ?? 0,
        VitaminB12: food.vitamin_b12 ?? 0,
        VitaminC: food.vitamin_c ?? 0,
        VitaminD: food.vitamin_d ?? 0,
        VitaminE: food.vitamin_e ?? 0,
        VitaminK: food.vitamin_k ?? 0,
        Calcium: food.calcium ?? 0,
        Iron: food.iron ?? 0,
        Potassium: food.potassium ?? 0,
        Magnesium: food.magnesium ?? 0,
        Sodium: food.sodium ?? 0,
        Zinc: food.zinc ?? 0,
      };

      // Adds food to Database (Foods Table)
      await foodService.addFoodtoDB(foodData);

      // Gets foodID of newly created Food in Food Table
      finalFoodID = await foodService.getFoodID({
        foodName: foodData.foodName,
        foodBrand: foodData.foodBrand,
        servingSize: foodData.servingSize,
        Calories: foodData.Calories,
        Protein: foodData.Protein,
        Carbohydrates: foodData.Carbohydrates,
        Fats: foodData.Fats,
      });
    }

    // Gets userID based on username and gets foodID
    const userID = await userService.getUserID(Username);

    finalFoodID = foodResponse == false ? finalFoodID : foodResponse;

    const finalFoodData = await foodService.getFood(finalFoodID);

    // Creates userFood input in DB using userID and foodID
    await userService.addFoodforUser({
      userID: userID,
      foodID: finalFoodID,
      Quantity: Quantity,
    });

    // Additional nutritional information coming from newly logged food
    const userAddedNutritionData = {
      userID: userID,
      Quantity: Quantity,
      currentCalories: finalFoodData.Calories ?? 0,
      currentProtein: finalFoodData.Protein ?? 0,
      currentCarbohydrates: finalFoodData.Carbohydrates ?? 0,
      currentFats: finalFoodData.Fats ?? 0,
      currentFiber: finalFoodData.Fiber ?? 0,
      currentVitaminA: finalFoodData.VitaminA ?? 0,
      currentVitaminB6: finalFoodData.VitaminB6 ?? 0,
      currentVitaminB12: finalFoodData.VitaminB12 ?? 0,
      currentVitaminC: finalFoodData.VitaminC ?? 0,
      currentVitaminD: finalFoodData.VitaminD ?? 0,
      currentVitaminE: finalFoodData.VitaminE ?? 0,
      currentVitaminK: finalFoodData.VitaminK ?? 0,
      currentCalcium: finalFoodData.Calcium ?? 0,
      currentIron: finalFoodData.Iron ?? 0,
      currentPotassium: finalFoodData.Potassium ?? 0,
      currentMagnesium: finalFoodData.Magnesium ?? 0,
      currentSodium: finalFoodData.Sodium ?? 0,
      currentZinc: finalFoodData.Zinc ?? 0,
    };

    // Update the daily nutritional information of the user based on the nutritional information added
    // by the new logged food
    await userService.updateUserNutrition(userAddedNutritionData);

    res.status(201).json("Food Logged");
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Edit the log of a food in the case of an erorr when logging originally
const editLog = async (req, res) => {
  try {
    const { userFood_ID, newQuantity } = req.body;

    // Get the original Quantity of the logged food
    const originalQuantity = await userService.getUserFoodQuantity(userFood_ID);

    if (originalQuantity === null) {
      res.status(404).send();
    }

    // Update the userFood in userFood table
    await userService.updateUserFood({
      userFood_ID: userFood_ID,
      Quantity: newQuantity,
    });

    // Get logged Foods data and adjust the quantity accordingly based on if
    // the edit is increasing or decreasing quantity of logged food
    let loggedFoodData = await foodService.getUserFoodData(userFood_ID);
    loggedFoodData.Quantity = newQuantity - originalQuantity;

    // Update the users day nutrition totals
    await userService.updateUserNutrition(loggedFoodData);

    res.status(200).json("Food Log Edited!");
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Deletes logged food from userFood and adjusts users day nutritional totals
// in userDailyNutrition Table
const deleteLog = async (req, res) => {
  try {
    const { userFood_ID } = req.body;

    // Get the logged foods nutritional information and adjust quantity to be negative
    // since deduction from days nutritional totals is needed
    let loggedFoodData = await foodService.getUserFoodData(userFood_ID);

    if (loggedFoodData === null) {
      res.status(404).json("Log Does not Exist");
    }

    loggedFoodData.Quantity = -loggedFoodData.Quantity;

    // Deletes food from userFood Table
    await foodService.deleteUserFood(userFood_ID);

    // Update the users day nutritional totals
    await userService.updateUserNutrition(loggedFoodData);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
  const { userFood_ID } = req.body;
};

const getCurrentNutrition = async (req, res) => {
  try {
    const { Username } = req.body;

    const userData = await userService.getUserCurrentNutrition(Username);

    if (userData === null) {
      res.status(404).json("User Currently has No Logs Today");
    } else {
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

export default {
  Login,
  Logout,
  newToken,
  getMacros,
  addUser,
  deleteUser,
  logFood,
  editLog,
  deleteLog,
  getCurrentNutrition,
};
