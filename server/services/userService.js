import User from "../models/userModel.js";
import Food from "../models/foodModel.js";
import userFood from "../models/userFoodModel.js";

const addUser = async (userData) => {
  return await User.create(userData);
};

const removeUser = async (username) => {
  return await User.destroy({
    where: {
      Username: username,
    },
  });
};

const addFoodforUser = async (userID, foodData) => {
  const { foodName } = foodData;

  const [food, created] = await Food.findOrCreate({
    where: { foodName },
    defaults: foodData,
  });

  //await userFood.create({ userID, foodID: food.id });

  //return await User.create(foodData);
};

const editFood = async (foodData) => {
  const { foodID, updatedFields } = foodData;
  
  // Check if the food exists
  const existingFood = await Food.findByPk(foodID);
  if (!existingFood) {
    throw new Error('Food not found');
  }

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

export default { addUser, removeUser, addFoodforUser, editFood };
