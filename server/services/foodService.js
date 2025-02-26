import { Sequelize } from "sequelize";
import Food from "../models/foodModel.js";
import sequelize from "../config/database.js";

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

const getRecommendedFood = async (MacroRequest) => {
  try {
    switch (MacroRequest) {
      case "High Protein":
        return await Food.findAll({
          where: {
            Protein: {
              [Sequelize.Op.gt]: Sequelize.literal("Calories / 10"),
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

export default { addFoodtoDB, deleteFood, getRecommendedFood };
