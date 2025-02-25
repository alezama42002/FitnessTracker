import { Sequelize } from "sequelize";
import Food from "../models/foodModel.js";

const addFoodtoDB = async (foodData) => {
  try {
    const newFood = Food.create(foodData);
    return newFood;
  } catch (error) {
    console.error("Issue adding food to DB:", error);
  }
};

const deleteFood = async (foodID, foodName) => {
  return await Food.destroy({
    where: {
      foodID: foodID,
      foodName: foodName,
    },
  });
};

const getRecommendedFood = async (wants) => {
  try {
    if (wants === "high protein") {
      return await Food.findByPk(1);
    }
  } catch (error) {
    console.error("Error getting recommended food: ", error);
  }
};

export default { addFoodtoDB, deleteFood, getRecommendedFood };
