import dotenv from "dotenv";
import userService from "../services/userService.js"; // Imports quieres/mutations related to User
import foodService from "../services/foodService.js";
import utilService from "../services/utilService.js";
import recipeService from "../services/recipeService.js";
import utilityFunctions from "../services/utilityFunctions.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  verifyToken,
} from "../middleware/authentication.js";

dotenv.config();

// Checks the users Username and if in the database and the password given
// matches the one in the database the user is given an accessToken as well
// as a refreshToken
const Login = async (req, res) => {
  const user = await userService.getUser(req.body.Username);
  const user_ = { name: req.body.Username };

  // Returns error is User is not in the database
  if (user === null) return res.status(401).send();

  try {
    // Generates and returns accessToken and refreshToken in the occurance
    // of a successful login
    if (await bycrypt.compare(req.body.Password, user.Password)) {
      const accessToken = generateAccessToken(user_);
      const refreshToken = jwt.sign(user_, process.env.REFRESH_TOKEN_SECRET);
      await utilService.addToken(refreshToken);
      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.status(401).send();
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Logs out the user by removing the refreshToken from the database so the
// user can no longer create new accessTokens once their current one expires
const Logout = (req, res) => {
  try {
    utilService.deleteToken(req.body.Token);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Creates a new accessToken if the refreshToken given is one of the refreshTokens
// stored in the database
const newToken = (req, res) => {
  const refreshToken = req.body.Token;

  try {
    // Returns 401 Unauthorized error in the case that the given refreshToken is not present
    // in database
    if (utilService.findToken(refreshToken) == false)
      return res.sendStatus(401);

    // Verifies the refreshToken with our env variable and creates and returns new accessToken
    // in the case of a successful verification of refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401); // Returns 401 Forbidden if refreshToken is not verified successfully
      const accessToken = generateAccessToken({ name: user.name });
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Checks to see if the accessToken's lifespan has expired
const checkToken = (req, res) => {
  try {
    const validValue = verifyToken(req.body.Token);

    // If token is still valid send 200 status code and 401 otherwise
    if (validValue === true) {
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Calculates the maintainence calories of a user based on information given.
// Also determines macros based on the users fitness/health goals.
const getMacros = async (req, res) => {
  const { Username, Goal } = req.body;
  try {
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
  const userData = req.body;
  try {
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
  const { Username } = req.body;
  try {
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

// Check Username to see if name has been taken
const checkUsername = async (req, res) => {
  try {
    if ((await userService.getUser(req.body.Username)) === null) {
      res.status(200).send(); // Username is not taken
    }
    res.status(409).send(); // Username is taken
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Gets all of the foods logged for the day for a specific username
const getFoods = async (req, res) => {
  try {
    const user = await userService.getUser(req.body.Username);
    const userID = user.userID;
    const Foods = await userService.getUserFoods(userID);

    if (Foods === null) res.status(404).send(); // Return 404 incase no logs for user exist for the day
    res.status(200).json(Foods);
  } catch {
    res.status(500).send();
  }
};

// Adds food to the database by using ID of food
const logFood = async (req, res) => {
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
  try {
    // Utitlity function to check if food from fatsecret api is already in our database and if
    // its not then it is stored in our database and the assosciated foodID is returned so that
    // we can make the connection to the user and that specific food in the database
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

    const recipe = await foodService.getFood(finalFoodID);

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
      currentCalories: recipe.Calories ?? 0,
      currentProtein: recipe.Protein ?? 0,
      currentCarbohydrates: recipe.Carbohydrates ?? 0,
      currentFats: recipe.Fats ?? 0,
      currentFiber: recipe.Fiber ?? 0,
      currentVitaminA: recipe.VitaminA ?? 0,
      currentVitaminB6: recipe.VitaminB6 ?? 0,
      currentVitaminB12: recipe.VitaminB12 ?? 0,
      currentVitaminC: recipe.VitaminC ?? 0,
      currentVitaminD: recipe.VitaminD ?? 0,
      currentVitaminE: recipe.VitaminE ?? 0,
      currentVitaminK: recipe.VitaminK ?? 0,
      currentCalcium: recipe.Calcium ?? 0,
      currentIron: recipe.Iron ?? 0,
      currentPotassium: recipe.Potassium ?? 0,
      currentMagnesium: recipe.Magnesium ?? 0,
      currentSodium: recipe.Sodium ?? 0,
      currentZinc: recipe.Zinc ?? 0,
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
  const { userFood_ID, newQuantity } = req.body;
  try {
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
  const Username = await userService.getUser(req.body.Username);
  const userID = Username.userID;

  const userFood_ID = await foodService.getUserFoodID(
    userID,
    req.body.foodID,
    req.body.Quantity
  );

  try {
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
};

// Returns the users current nutritional totals for the day
const getCurrentNutrition = async (req, res) => {
  const { Username } = req.body;

  try {
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

// Logs the users weight for the day
const logWeight = async (req, res) => {
  try {
    await userService.addWeight(req.body.Username, req.body.Weight);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Gets all of the users weights for the week
const getUserWeights = async (req, res) => {
  // Creates a formatted string to represent the days date in
  // month/day/year format
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear()).slice(-2);
  const formattedDate = `${month}/${day}/${year}`;

  try {
    // Finds all of the weights for the week of the date that is provided
    const weekWeightLogs = await userService.getUserWeights(
      req.body.Username,
      formattedDate
    );

    if (weekWeightLogs === null) res.sendStatus(404);

    res.status(200).json(weekWeightLogs);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Logs a recipe for the user and adjusts the users daily nutrition totals accordinly
const logRecipe = async (req, res) => {
  try {
    // Finds the recipe and also finds the exact recipe incase there are multipe recipes of
    // the name provided
    const recipes = await recipeService.getRecipe(req.body.recipeName);
    const recipe = recipes.find((r) => r.totalCalories === req.body.Calories);

    const user = await userService.getUser(req.body.Username);

    const quantity = req.body.servings / recipe.dataValues.totalServings; // Fraction needed for macro/micro calculations

    const userAddedNutritionData = {
      userID: user.dataValues.userID,
      Quantity: quantity,
      currentCalories: recipe.dataValues.totalCalories ?? 0,
      currentProtein: recipe.dataValues.totalProtein ?? 0,
      currentCarbohydrates: recipe.dataValues.totalCarbohydrates ?? 0,
      currentFats: recipe.dataValues.totalFats ?? 0,
      currentFiber: recipe.dataValues.totalFiber ?? 0,
      currentVitaminA: recipe.dataValues.totalVitaminA ?? 0,
      currentVitaminB6: recipe.dataValues.totalVitaminB6 ?? 0,
      currentVitaminB12: recipe.dataValues.totalVitaminB12 ?? 0,
      currentVitaminC: recipe.dataValues.totalVitaminC ?? 0,
      currentVitaminD: recipe.dataValues.totalVitaminD ?? 0,
      currentVitaminE: recipe.dataValues.totalVitaminE ?? 0,
      currentVitaminK: recipe.dataValues.totalVitaminK ?? 0,
      currentCalcium: recipe.dataValues.totalCalcium ?? 0,
      currentIron: recipe.dataValues.totalIron ?? 0,
      currentPotassium: recipe.dataValues.totalPotassium ?? 0,
      currentMagnesium: recipe.dataValues.totalMagnesium ?? 0,
      currentSodium: recipe.dataValues.totalSodium ?? 0,
      currentZinc: recipe.dataValues.totalZinc ?? 0,
    };

    await userService.updateUserNutrition(userAddedNutritionData);
    await userService.addRecipeForUser(
      recipe.dataValues.recipeID,
      user.userID,
      quantity
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Sets the users macros according the macros given by the user
const setMacros = async (req, res) => {
  try {
    await userService.changeUserMacros(req.body.Username, req.body.Macros);
    res.status(200).json("Macros Updated");
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Returns the users macros from the database
const getUserMacros = async (req, res) => {
  try {
    const user = await userService.getUser(req.body.Username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      Calories: user.calorieGoal,
      Protein: user.proteinGoal,
      Carbohydrates: user.carbGoal,
      Fat: user.fatGoal,
    });
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

const getUserRecipes = async (req, res) => {
  const { Username } = req.body;
  try {
    const recipes = await userService.getUserRecipes(Username);
    if (!recipes) {
      return res.status(404).json({ error: "No recipes found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
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
  logRecipe,
  checkUsername,
  setMacros,
  getUserMacros,
  getUserRecipes,
};
