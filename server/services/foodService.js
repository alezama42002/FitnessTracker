import { Sequelize } from "sequelize";
import Food from "../models/foodModel.js";
import userFood from "../models/userFoodModel.js";
import { Op } from "sequelize";

// Adds food to Database (Foods Table)
const addFoodtoDB = async (foodData) => {
  return await Food.create(foodData);
};

// Deletes food from Database (Foods Table) using the foodID and foodName
const deleteFood = async (foodID, foodName) => {
  return await Food.destroy({
    where: {
      foodID: foodID,
      foodName: foodName,
    },
  });
};

// Returns all the foods that match a certain macro threshold that is given
// by the user
const getRecommendedFood = async (MacroRequest) => {
  try {
    // Handle all of the different macro threshold options
    switch (MacroRequest) {
      case "All":
        return await Food.findAll();
      case "High Protein":
        return await Food.findAll({
          where: {
            Protein: {
              [Sequelize.Op.gte]: Sequelize.literal("Calories / 10"),
            },
          },
        });
      case "High Carb":
        return await Food.findAll({
          where: {
            Carbohydrates: {
              [Sequelize.Op.gte]: 15,
            },
          },
        });
      case "Low Carb":
        return await Food.findAll({
          where: {
            Carbohydrates: {
              [Sequelize.Op.lt]: 15,
            },
          },
        });
      case "Low Fat":
        return await Food.findAll({
          where: {
            Fats: {
              [Sequelize.Op.lt]: 15,
            },
          },
        });
    }
  } catch (error) {
    console.error("Error getting recommended food: ", error);
  }
};

// Gets food from Database (Foods Table) using the foodID
const getFood = async (foodID) => {
  const food = await Food.findOne({
    where: {
      foodID: foodID,
    },
  });

  return food;
};

// Gets the foodID for a food based on some of the nutritional information and
// returns false if not in Database
const getFoodID = async (foodData) => {
  const {
    foodName,
    foodBrand,
    CaloriesRange,
    ProteinRange,
    CarbohydratesRange,
    FatsRange,
  } = foodData;

  const food = await Food.findOne({
    where: {
      foodName,
      foodBrand,
      Calories: { [Op.between]: CaloriesRange },
      Protein: { [Op.between]: ProteinRange },
      Carbohydrates: { [Op.between]: CarbohydratesRange },
      Fats: { [Op.between]: FatsRange },
    },
  });

  if (food === null) {
    return false;
  } else {
    return food.foodID;
  }
};

// Gets all foods that match the name provided
const getFoods = async (foodName) => {
  const foods = await Food.findAll({
    where: {
      foodName: {
        [Op.like]: `%${foodName}%`,
      },
    },
  });

  return foods;
};

// Deletes a userFood connection in the userFoods table
const deleteUserFood = async (userFood_ID) => {
  await userFood.destroy({
    where: { userFood_ID: userFood_ID },
  });
};

// Gets all the data assosciated with a specific userFood_ID
const getUserFoodData = async (userFood_ID) => {
  const food = await userFood.findOne({
    where: { userFood_ID: userFood_ID },
  });

  if (food === null) {
    return null;
  }

  const foodID = food.foodID;
  const userID = food.userID;
  const foodData = await getFood(foodID);

  const loggedFoodNutritionData = {
    userID: userID,
    Quantity: food.Quantity,
    currentCalories: foodData.Calories ?? 0,
    currentProtein: foodData.Protein ?? 0,
    currentCarbohydrates: foodData.Carbohydrates ?? 0,
    currentFats: foodData.Fats ?? 0,
    currentFiber: foodData.Fiber ?? 0,
    currentVitaminA: foodData.VitaminA ?? 0,
    currentVitaminB1: foodData.VitaminB1 ?? 0,
    currentVitaminB2: foodData.VitaminB2 ?? 0,
    currentVitaminB3: foodData.VitaminB3 ?? 0,
    currentVitaminB5: foodData.VitaminB5 ?? 0,
    currentVitaminB6: foodData.VitaminB6 ?? 0,
    currentVitaminB9: foodData.VitaminB9 ?? 0,
    currentVitaminB12: foodData.VitaminB12 ?? 0,
    currentVitaminC: foodData.VitaminC ?? 0,
    currentVitaminD: foodData.VitaminD ?? 0,
    currentVitaminE: foodData.VitaminE ?? 0,
    currentVitaminK: foodData.VitaminK ?? 0,
    currentCalcium: foodData.Calcium ?? 0,
    currentChlorine: foodData.Chlorine ?? 0,
    currentCopper: foodData.Copper ?? 0,
    currentIron: foodData.Iron ?? 0,
    currentIodine: foodData.Iodine ?? 0,
    currentPotassium: foodData.Potassium ?? 0,
    currentMagnesium: foodData.Magnesium ?? 0,
    currentManganese: foodData.Manganese ?? 0,
    currentSodium: foodData.Sodium ?? 0,
    currentPhosphorus: foodData.Phosphorus ?? 0,
    currentSelenium: foodData.Selenium ?? 0,
    currentZinc: foodData.Zinc ?? 0,
  };

  return loggedFoodNutritionData;
};

// Edits a foods data in the database according to what is given
const editFood = async (foodID, updatedFields) => {
  // Check if the food exists
  const existingFood = await Food.findByPk(foodID);

  // Update the food
  await Food.update(
    { ...updatedFields },
    {
      where: { foodID },
    }
  );

  // Return the updated food data
  return await Food.findByPk(foodID);
};

// Gets a single food based on the foodName and foodBrand
const getFoodByName = async (foodName, foodBrand) => {
  return await Food.findOne({
    where: { foodName: foodName, foodBrand: foodBrand },
  });
};

const getUserFoodID = async (userID, foodID, Quantity) => {
  const food = await userFood.findOne({
    where: { userID: userID, foodID: foodID, Quantity: Quantity },
  });

  if (food === null) {
    return false;
  } else {
    return food.userFood_ID;
  }
};

export default {
  addFoodtoDB,
  deleteFood,
  getRecommendedFood,
  getFood,
  getFoods,
  getFoodID,
  deleteUserFood,
  getUserFoodData,
  editFood,
  getFoodByName,
  getUserFoodID,
};
