import Food from "../models/foodModel.js";
import userFood from "../models/userFoodModel.js";

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

// Gets food from Database (Foods Table) using the foodID
const getFood = async (foodID) => {
  const [food, created] = await Food.findAll({
    where: { foodID },
  });

  return food;
};

// Gets the foodID for a food based on some of the nutritional information and
// returns false if not in Database
const getFoodID = async (foodData) => {
  const { foodName, servingSize, Calories, Protein, Carbohydrates, Fats } =
    foodData;
  const food = await Food.findOne({
    where: {
      foodName: foodName,
      servingSize: servingSize,
      Calories: Calories,
      Protein: Protein,
      Carbohydrates: Carbohydrates,
      Fats: Fats,
    },
  });

  if (food === null) {
    return false;
  } else {
    return food.foodID;
  }
};

const getFoods = async (foodName) => {
  const [foods, created] = await Food.findAll({
    where: { foodName },
  });

  return foods;
};

export default {
  addFoodtoDB,
  deleteFood,
  getFood,
  getFoods,
  getFoodID,
};
