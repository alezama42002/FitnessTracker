import Food from "../models/foodModel.js";

const addFoodtoDB = async (foodData) => {
    return await Food.create(foodData)
}


export default { addFoodtoDB }