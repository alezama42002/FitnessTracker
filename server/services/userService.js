import User from "../models/userModel.js";
import Food from "../models/foodModel.js";
import userFood from "../models/userFoodModel.js";
import userNutritionProgress from "../models/userDailyNutritionModel.js";

// Adds new user to the Users table
const addUser = async (userData) => {
  return await User.create(userData);
};

// Removes a user from the Users table
const deleteUser = async (userID) => {
  return await User.destroy({
    where: {
      userID: userID,
    },
  });
};

const userExists = async (userID) => {
  const user = await User.findOne({
    where: {
      userID: userID,
    },
  });

  const presentStatus = user === null ? false : true;

  return presentStatus;
};

// Gets the userID for a user using the username
const getUserID = async (username) => {
  const user = await User.findOne({
    where: {
      Username: username,
    },
  });

  if (user === null) {
    return null;
  }

  return user.userID;
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

const updateUserFood = async (userFoodAdjustmentData) => {
  const { userFood_ID, Quantity } = userFoodAdjustmentData;

  await userFood.update(
    { Quantity: Quantity },
    { where: { userFood_ID: userFood_ID } }
  );
};

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

const getUserCurrentNutrition = async (Username) => {
  const userID = await getUserID(Username);

  const date = new Date();
  const month = date.getMonth() + 1; // Months are 0-based
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

export default {
  addUser,
  deleteUser,
  userExists,
  getUserID,
  addFoodforUser,
  updateUserNutrition,
  updateUserFood,
  getUserFoodQuantity,
  getUserCurrentNutrition,
};
