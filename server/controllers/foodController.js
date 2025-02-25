import body from "express-validator";
import axios from "axios";
import dotenv from "dotenv";
import foodService from "../services/foodService.js";
import userService from "../services/userService.js";

dotenv.config();

const searchFoodByName = async (req, res) => {
  const { name } = req.body;

  try {
    const response = await axios.get(
      "https://platform.fatsecret.com/rest/server.api",
      {
        params: {
          method: "foods.search",
          search_expression: `${name}`,
          format: "json",
        },
        headers: {
          Authorization: `Bearer ${process.env.FATSECRET_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const filteredData = response.data.foods.food.map((food) => ({
      name: food.food_name,
      macros: food.food_description,
      ID: food.food_id,
    }));

    res.send(response.data);
  } catch (error) {
    res.error("Error", error);
  }
};

// Adds food to our database that's not in found in FatSecret's based on user input from form
const addFood = async (req, res) => {
  const foodData = req.body;

  foodService.addFoodtoDB(foodData);

  res.send("Food Added to System!");
};

// Allows admin to remove foods from the database
const removeFood = async (req, res) => {
  const foodData = req.body;
  const { foodID, foodName } = foodData;

  foodService.deleteFood(foodID, foodName);

  res.send("Food Was Removed!");
};

// Allows food to be edited by the user in the database
const modifyFood = async (req, res) => {
  const foodData = req.body;
  const { foodID, foodName } = foodData;

  userService.editFood(foodData);

  res.send("Food Edited Successfully")
}

// Recommends food to the user based on what they are looking for (ex: high protein, high carbs, etc.)
const recommendFood = (req, res) => {
  const { wants } = req.body;
  console.log(wants)
  const foodRecs = foodService.getRecommendedFood(wants);
  res.send(foodRecs)
}

export default { searchFoodByName, addFood, removeFood, modifyFood, recommendFood };
