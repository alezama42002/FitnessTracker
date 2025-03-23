import User from "../models/userModel.js";
import Food from "../models/foodModel.js";
import userFood from "../models/userFoodModel.js";
import userNutritionProgress from "../models/userDailyNutritionModel.js";
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
  const { Quantity, adjustmentType } = userDailyNutritionData;

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
    await userNutritionData.update(updatedValues);
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
  const userID = await getUserID(Username);

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
    for (let x = 0; x < food.dataValues.Quantity; x++) {
      foodIDs.push(food.foodID);
    }
  });

  // For each of the foodIDs we get the food assosciated to that foodID and then
  // retrieve the necessary data
  const foodDataPromises = foodIDs.map(async (foodID) => {
    const foodData = await Food.findOne({
      where: {
        foodID: foodID,
      },
    });

    const foodItem = {
      foodName: foodData.foodName,
      Calories: foodData.Calories,
      Protein: foodData.Protein,
      Carbs: foodData.Carbohydrates,
      Fat: foodData.Fats,
    };

    return foodItem;
  });

  // Constructs an array of objects that contain the needed data for each of the foods
  const foodItems = await Promise.all(foodDataPromises);
  return foodItems;
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
};
