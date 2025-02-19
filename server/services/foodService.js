import Food from "../models/foodModel.js";

const addFoodtoDB = async (foodData) => {
  return await Food.create(foodData);
};

const deleteFood = async (foodID, foodName) => {
  return await Food.destroy({
    where: {
      foodID, foodID,
      foodName: foodName,
    },
  });
};

export default { addFoodtoDB, deleteFood };
