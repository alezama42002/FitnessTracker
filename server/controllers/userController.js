import body from "express-validator";
import axios from "axios";
import dotenv from "dotenv";
import userService from "../services/userService.js"; // Imports quieres/mutations related to User
import foodService from "../services/foodService.js";

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
const logFood = async (req, res) => {
  try {
    const {
      foodID,
      foodName,
      servingSize,
      Calories,
      Protein,
      Carbohydrates,
      Fats,
      username,
      quantity,
    } = req.body;

    let finalFoodID;

    // Gets the necessary foodID for the given food based on the food wishing to be logged.
    // Foods key nutrtional information is used to find ID.
    const foodResponse = await foodService.getFoodID({
      foodName: foodName,
      servingSize: servingSize,
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
            finalFoodDataid: `${foodID}`,
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
        foodName: response.data.food.finalFoodDataname || "Unknown Food",
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
      };

      // Adds food to Database (Foods Table)
      foodService.addFoodtoDB(foodData);

      // Gets foodID of newly created Food in Food Table
      finalFoodID = foodService.getFoodID({
        foodName: foodData.foodName,
        servingSize: foodData.servingSize,
        Calories: foodData.Calories,
        Protein: foodData.Protein,
        Carbohydrates: foodData.Carbohydrates,
        Fats: foodData.Fats,
      });
    }

    // Gets userID based on username and gets foodID
    const userID = await userService.getUserID(username);
    finalFoodID = foodResponse;
    const finalFoodData = await foodService.getFood(finalFoodID);

    // Creates userFood input in DB using userID and foodID
    await userService.addFoodforUser({
      userID: userID,
      foodID: finalFoodID,
      Quantity: quantity,
    });

    // Additional nutritional information coming from newly logged food
    const userAddedNutritionData = {
      userID: userID,
      currentCalories: finalFoodData.Calories ?? 0,
      currentProtein: finalFoodData.Protein ?? 0,
      currentCarbohydrates: finalFoodData.Carbohydrates ?? 0,
      currentFats: finalFoodData.Fats ?? 0,
      currentFiber: finalFoodData.Fiber ?? 0,
      currentVitaminA: finalFoodData.VitaminA ?? 0,
      currentVitaminB1: finalFoodData.VitaminB1 ?? 0,
      currentVitaminB2: finalFoodData.VitaminB2 ?? 0,
      currentVitaminB3: finalFoodData.VitaminB3 ?? 0,
      currentVitaminB5: finalFoodData.VitaminB5 ?? 0,
      currentVitaminB6: finalFoodData.VitaminB6 ?? 0,
      currentVitaminB9: finalFoodData.VitaminB9 ?? 0,
      currentVitaminB12: finalFoodData.VitaminB12 ?? 0,
      currentVitaminC: finalFoodData.VitaminC ?? 0,
      currentVitaminD: finalFoodData.VitaminD ?? 0,
      currentVitaminE: finalFoodData.VitaminE ?? 0,
      currentVitaminK: finalFoodData.VitaminK ?? 0,
      currentCalcium: finalFoodData.Calcium ?? 0,
      currentChlorine: finalFoodData.Chlorine ?? 0,
      currentCopper: finalFoodData.Copper ?? 0,
      currentIron: finalFoodData.Iron ?? 0,
      currentIodine: finalFoodData.Iodine ?? 0,
      currentPotassium: finalFoodData.Potassium ?? 0,
      currentMagnesium: finalFoodData.Magnesium ?? 0,
      currentManganese: finalFoodData.Manganese ?? 0,
      currentSodium: finalFoodData.Sodium ?? 0,
      currentPhosporus: finalFoodData.Phosporus ?? 0,
      currentSelenium: finalFoodData.Selenium ?? 0,
      currentZinc: finalFoodData.Zinc ?? 0,
    };

    // Update the daily nutritional information of the user based on the nutritional information added
    // by the new logged food
    await userService.updateUserNutrition(userAddedNutritionData);

    res.send("Food Logged!");
  } catch (error) {}
};

// Adds user to database based on given user information.
const addUser = async (req, res) => {
  const userData = req.body;

  userService.addUser(userData);

  res.send("User added!");
};

export default { getMacros, logFood, addUser };
