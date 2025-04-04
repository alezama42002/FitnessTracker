import axios from "axios";
import dotenv from "dotenv";
import userService from "../services/userService.js"; // Imports quieres/mutations related to User
import foodService from "../services/foodService.js";
import utilService from "../services/utilService.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  verifyToken,
} from "../middleware/authentication.js";
import utilityFunctions from "../services/utilityFunctions.js";

dotenv.config();

// Checks the users Username and if in the database and the password given
// matches the one in the database the user is given an accessToken as well
// as a refreshToken
const Login = async (req, res) => {
  const user = await userService.getUser(req.body.Username);
  const user_ = { name: req.body.Username };

  // Returns error is User is not in the database
  if (user === null) return res.status(400).send("Cannot Find User");

  try {
    // Generates and returns accessToken and refreshToken in the occurance
    // of a successful login
    if (await bycrypt.compare(req.body.Password, user.Password)) {
      const accessToken = generateAccessToken(user_);
      const refreshToken = jwt.sign(user_, process.env.REFRESH_TOKEN_SECRET);
      await utilService.addToken(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Logs out the user by removing the refreshToken from the database so the
// user can no longer create new accessTokens once their current one expires
const Logout = (req, res) => {
  utilService.deleteToken(req.body.Token);
  res.sendStatus(204);
};

// Creates a new accessToken if the refreshToken given is one of the refreshTokens
// stored in the database
const newToken = (req, res) => {
  const refreshToken = req.body.Token;

  // Returns 403 Forbidden error in the case that the given refreshToken is not present
  // in database
  if (utilService.findToken(refreshToken) == false) return res.sendStatus(403);

  // Verifies the refreshToken with our env variable and creates and returns new accessToken
  // in the case of a successful verification of refreshToken
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Returns 403 Forbidden if refreshToken is not verified successfully
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
};

const checkToken = (req, res) => {
  const validValue = verifyToken(req.body.Token);

  if (validValue === true) {
    res.status(200).json({ Valid: true });
  } else {
    res.status(200).json({ Valid: false });
  }
};

// Calculates the maintainence calories of a user based on information given.
// Also determines macros based on the users fitness/health goals.
const getMacros = async (req, res) => {
  try {
    const { Username, Goal } = req.body;

    const User = await userService.getUser(Username);
    const { Weight, Height, Age, Gender, activityLevel } = User;

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
      Calories: caloriesIntake,
      Protein: proteinIntake,
      Carbohydrates: carbIntake,
      Fat: fatIntake,
    });
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Adds user to database based on given user information.
const addUser = async (req, res) => {
  try {
    const userData = req.body;

    if ((await userService.getUser(userData.Username)) != null) {
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
    const { Username } = req.body;

    if ((await userService.getUser(Username)) === null) {
      res.status(404).json("User does not exist");
    } else {
      await userService.deleteUser(Username);
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

const getFoods = async (req, res) => {
  try {
    const user = await userService.getUser(req.body.Username);
    const userID = user.userID;
    const Foods = await userService.getUserFoods(userID);
    res.json(Foods);
  } catch {
    res.status(500).send();
  }
};

// Adds food to the database by using ID of food
const logFood = async (req, res) => {
  try {
    const {
      foodID,
      servingSize,
      foodName,
      foodBrand,
      Calories,
      Protein,
      Carbohydrates,
      Fats,
      Username,
      Quantity,
    } = req.body;

    const finalFoodID = await utilityFunctions.checkFood({
      foodID,
      servingSize,
      foodName,
      foodBrand,
      Calories,
      Protein,
      Carbohydrates,
      Fats,
    });

    // Gets userID based on username and gets foodID
    const user = await userService.getUser(Username);
    const userID = user.userID;

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

// Returns the users current nutritional totals for the day
const getCurrentNutrition = async (req, res) => {
  try {
    const { Username } = req.body;

    const userData = await userService.getUserCurrentNutrition(Username);

    // Returns 404 if no logs for the day assosciated to the user and returns 200
    // and all totals otherwise
    if (userData === null) {
      res.status(404).json("User Currently has No Logs Today");
    } else {
      res.status(200).json(userData);
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

const logWeight = async (req, res) => {
  await userService.addWeight(req.body.Username, req.body.Weight);
  res.sendStatus(201);
};

const getUserWeights = async (req, res) => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear()).slice(-2);
  const formattedDate = `${month}/${day}/${year}`;

  const weekWeightLogs = await userService.getUserWeights(
    req.body.Username,
    formattedDate
  );

  res.status(200).json(weekWeightLogs);
};

export default {
  Login,
  Logout,
  newToken,
  checkToken,
  getMacros,
  addUser,
  deleteUser,
  getFoods,
  logFood,
  editLog,
  deleteLog,
  getCurrentNutrition,
  logWeight,
  getUserWeights,
};
