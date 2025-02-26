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

const getRecommendedFood = async (wants) => {
  try {
    switch (wants){      
      case 'high protein':
        return await Food.findAll({
          where: {
            Protein: {
              [Sequelize.Op.gt]: Sequelize.literal("Calories / 10") ,
            }
          }
        });
      case 'high carbs':
        return await Food.findAll({
          where: {
            Carbohydrates: {
              [Sequelize.Op.gte]: 15,
            }
          }
        })
      case 'low carbs':
        return await Food.findAll({
          where: {
            Carbohydrates: {
              [Sequelize.Op.lt]: 15,
            }
          }
        })

    }
  } catch (error) {
    console.error("Error getting recommended food: ", error);
  }
};

export default { addFoodtoDB, deleteFood, getRecommendedFood };
