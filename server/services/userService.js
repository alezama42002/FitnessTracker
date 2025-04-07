import User from "../models/userModel.js";
import Food from "../models/foodModel.js";
import userRecipe from "../models/userRecipeModel.js";
import Recipe from "../models/recipeModel.js";
import userFood from "../models/userFoodModel.js";
import userNutritionProgress from "../models/userDailyNutritionModel.js";
import Weight from "../models/weightModel.js";
import { Op } from "sequelize";
import moment from "moment";

// Adds new user to the Users table
const addUser = async (userData) => {
  return await User.create(userData);
};

// Removes a user from the Users table
const deleteUser = async (Username) => {
  return await User.destroy({
    where: {
      Username: Username,
    },
  });
};

// Gets user from Users table
const getUser = async (username) => {
  const user = await User.findOne({
    where: {
      Username: username,
    },
  });

  return user;
};

// Creates new userFood in database
const addFoodforUser = async (logData) => {
  await userFood.create(logData);
};

// Adds logged foods nutritional information to users daily totals
const updateUserNutrition = async (userDailyNutritionData) => {
  const { Quantity } = userDailyNutritionData;

  const date = new Date();
  const month = date.getMonth() + 1; // Months are 0-based
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);

  // Gets all of the attributes in userDailyNutrition table that need to be updated
  // so that only those attributes are updated
  const updateFields = Object.keys(userNutritionProgress.rawAttributes).filter(
    (key) => key.startsWith("current")
  );

  // Creates new object that contains all updated values of the nutritional information for the users day
  const updatedValues = {};
  updateFields.forEach((field) => {
    // Adjusts nutritional information based on quantity given
    updatedValues[field] = userDailyNutritionData[field] * Quantity;
  });

  // Finds or creates users daily nutrition tracking in Database
  const [userNutritionData, created] = await userNutritionProgress.findOrCreate(
    {
      where: {
        userID: userDailyNutritionData.userID,
        logDate: `0${month}/${day}/${year}`,
      },
      defaults: updatedValues,
    }
  );

  if (!created) {
    updateFields.forEach((field) => {
      // Adjusts total nutritional information
      updatedValues[field] = userNutritionData[field] + updatedValues[field];
    });

    // Updates the values we want updated
    await userNutritionData.update(updatedValues, {
      where: { logDate: `0${month}/${day}/${year}` },
    });
  }
};

// Updates the Quantity of a previously logged food in the case of
// an error when original log was made
const updateUserFood = async (userFoodAdjustmentData) => {
  const { userFood_ID, Quantity } = userFoodAdjustmentData;

  await userFood.update(
    { Quantity: Quantity },
    { where: { userFood_ID: userFood_ID } }
  );
};

// Gets the users quantity for a specific food that they logged
const getUserFoodQuantity = async (userFood_ID) => {
  const userFoodData = await userFood.findOne({
    where: { userFood_ID: userFood_ID },
  });

  if (userFoodData === null) {
    return null;
  } else {
    return userFoodData.dataValues.Quantity;
  }
};

// Gets the users current nutritional totals for the day
const getUserCurrentNutrition = async (Username) => {
  const user = await getUser(Username);
  const userID = user.userID;

  // Constructs the current days date in month/day/year format
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);
  const logDate = `0${month}/${day}/${year}`;

  const userCurrentNutritionData = await userNutritionProgress.findOne({
    where: {
      userID: userID,
      logDate: logDate,
    },
  });

  if (userCurrentNutritionData === null) {
    return null;
  } else {
    return userCurrentNutritionData;
  }
};

// Gets all the users currently logged foods for the day
const getUserFoods = async (userID) => {
  let foodIDs = [];

  // Variables for selecting only foods logged in the current day
  const startOfDay = moment().startOf("day").toDate();
  const endOfDay = moment().endOf("day").toDate();

  const userFoodsData = await userFood.findAll({
    where: {
      createdAt: {
        [Op.gte]: startOfDay,
        [Op.lte]: endOfDay,
      },
      userID: userID,
    },
  });

  // Adds a foodID "x" times to the foodIDs array according to the quantity of
  // the logged good
  userFoodsData.forEach((food) => {
    foodIDs.push({
      foodID: food.foodID,
      Quantity: food.Quantity,
      creationTime: moment(food.createdAt).format("h:mm A"),
    });
  });

  // For each of the foodIDs we get the food assosciated to that foodID and then
  // retrieve the necessary data
  const foodDataPromises = foodIDs.map(async (food) => {
    const foodData = await Food.findOne({
      where: {
        foodID: food.foodID,
      },
    });

    const foodItem = {
      Name: foodData.foodName,
      Calories: foodData.Calories,
      Protein: foodData.Protein,
      Carbs: foodData.Carbohydrates,
      Fat: foodData.Fats,
      Quantity: food.Quantity,
      logTime: food.creationTime,
      foodID: foodData.foodID,
    };

    return foodItem;
  });

  // Constructs an array of objects that contain the needed data for each of the foods
  const foodItems = await Promise.all(foodDataPromises);
  return foodItems;
};

// Logs a weight for the user
const addWeight = async (username, weight) => {
  const user = await getUser(username);
  const userID = user.userID;

  // Formats the date for storage in the database
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const year = String(today.getFullYear()).slice(-2);
  const formattedDate = `${month}/${day}/${year}`;

  return await Weight.create({
    Weight: weight,
    userID: userID,
    logDate: formattedDate,
  });
};

// Gets all of the user weights associated with the week of the inputted date
const getUserWeights = async (Username, inputDate) => {
  const user = await getUser(Username);
  const userID = user.userID;

  const date = new Date(inputDate);
  const dayOfWeek = date.getDay();

  // Adjust so that Monday is the start of the week
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  // Generate array of the full week (Monday - Sunday)
  const weekArray = Array.from({ length: 7 }, (_, i) => {
    const weekDate = new Date(startOfWeek);
    weekDate.setDate(startOfWeek.getDate() + i);

    const month = String(weekDate.getMonth() + 1).padStart(2, "0");
    const day = String(weekDate.getDate()).padStart(2, "0");
    return `${month}/${day}/25`;
  });

  const weeksWeightLogs = await Weight.findAll({
    where: {
      userID: userID,
      logDate: {
        [Op.in]: weekArray,
      },
    },
  });

  const weeksWeights = weeksWeightLogs.map((weight) => weight.Weight);

  return weeksWeights;
};

// Makes the connection to the recipe for a user
const addRecipeForUser = async (recipeID, userID, servings) => {
  await userRecipe.create({
    userID: userID,
    Servings: servings,
    recipeID: recipeID,
  });
};

// Alters the macros of the user in the Users table
const changeUserMacros = async (username, macros) => {
  const user = await getUser(username);
  const userID = user.userID;

  await user.update(
    {
      calorieGoal: macros.Calories,
      proteinGoal: macros.Protein,
      carbGoal: macros.Carbohydrates,
      fatGoal: macros.Fat,
    },
    {
      where: {
        userID: userID,
      },
    }
  );
};

const getUserRecipes = async (username) => {
  const user = await getUser(username);
  const userID = user.userID;

  // Variables for selecting only foods logged in the current day
  const startOfDay = moment().startOf("day").toDate();
  const endOfDay = moment().endOf("day").toDate();

  const userRecipes = await userRecipe.findAll({
    where: {
      createdAt: {
        [Op.gte]: startOfDay,
        [Op.lte]: endOfDay,
      },
      userID: userID,
    },
  });

  if (userRecipes.length != 0) {
    const recipesData = userRecipes.map((recipe) => ({
      recipeID: recipe.recipeID,
      Servings: recipe.Servings,
      creationTime: moment(recipe.createdAt).format("h:mm A"),
    }));

    const recipeIDs = recipesData.map((recipe) => recipe.recipeID);

    const recipes = await Recipe.findAll({
      where: {
        recipeID: {
          [Op.in]: recipeIDs,
        },
      },
    });

    const recipeData = recipesData
      .map((recipeData) => {
        const recipe = recipes.find((r) => r.recipeID === recipeData.recipeID);

        if (recipe) {
          const servings = recipeData.Servings / recipe.totalServings;
          return {
            Name: recipe.recipeName,
            Protein: Math.round(recipe.totalProtein),
            Carbs: Math.round(recipe.totalCarbs),
            Calories: Math.round(recipe.totalCalories),
            Fat: Math.round(recipe.totalFats),
            Servings: servings,
            logTime: recipeData.creationTime,
          };
        }
        return null;
      })
      .filter((item) => item !== null);

    return recipeData;
  } else return null;
};

const deleteRecipeLog = async (recipeID, userID, Servings) => {
  const recipe = await userRecipe.findOne({
    where: {
      userID: userID,
      recipeID: recipeID,
      Servings: Servings,
    },
  });

  if (recipe) {
    await recipe.destroy();
  }
};

const editRecipeLog = async (userID, recipeID, Servings, newServings) => {
  const recipe = await userRecipe.findOne({
    where: {
      userID: userID,
      recipeID: recipeID,
      Servings: Servings,
    },
  });

  if (recipe) {
    await recipe.update({ Servings: newServings });
  }
};

export default {
  addUser,
  deleteUser,
  getUser,
  getUserFoods,
  addFoodforUser,
  updateUserNutrition,
  updateUserFood,
  getUserFoodQuantity,
  getUserCurrentNutrition,
  addWeight,
  getUserWeights,
  addRecipeForUser,
  changeUserMacros,
  getUserRecipes,
  deleteRecipeLog,
  editRecipeLog,
};
