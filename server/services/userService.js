import User from "../models/userModel.js";
import Food from "../models/foodModel.js";
import userFood from "../models/userFoodModel.js";
import userNutritionProgress from "../models/userDailyNutritionModel.js";
import userService from "../services/foodService.js";

// Adds new user to the Users table
const addUser = async (userData) => {
  return await User.create(userData);
};

// Removes a user from the Users table
const removeUser = async (username) => {
  return await User.destroy({
    where: {
      Username: username,
    },
  });
};

// Gets the userID for a user using the username
const getUserID = async (username) => {
  const user = await User.findOne({
    where: {
      Username: username,
    },
  });

  return user.userID;
};

// Creates new userFood in database
const addFoodforUser = async (logData) => {
  await userFood.create(logData);
};

// Adds logged foods nutritional information to users daily totals
const updateUserNutrition = async (userDailyNutritionData) => {
  const date = new Date();
  const month = date.getMonth() + 1; // Months are 0-based
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);

  // Finds or creates users daily nutrition tracking in Database
  const [userNutritionData, created] = await userNutritionProgress.findOrCreate(
    {
      where: {
        userID: userDailyNutritionData.userID,
        logDate: `0${month}/${day}/${year}`,
      },
      defaults: userDailyNutritionData,
    }
  );

  if (!created) {
    // Gets all of the attributes in userDailyNutrition table that need to be updated
    // so that only those attributes are updated
    const updateFields = Object.keys(
      userNutritionProgress.rawAttributes
    ).filter((key) => key.startsWith("current"));

    // Creates new object that contains all updated values of the nutritional information for the users day
    const updatedValues = {};
    updateFields.forEach((field) => {
      updatedValues[field] =
        userNutritionData[field] + userDailyNutritionData[field];
    });

    // Updates the values we want updated
    await userNutritionData.update(updatedValues);
  }
};

export default {
  addUser,
  removeUser,
  getUserID,
  addFoodforUser,
  updateUserNutrition,
};
