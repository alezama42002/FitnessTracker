import body from "express-validator";
import axios from "axios";
import dotenv from "dotenv";
import foodService from "../services/foodService.js";

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

    res.send(filteredData);
  } catch (error) {
    res.error("Error", error);
  }
};

// Adds food to our database that's not in found in FatSecret's based on user input from form
const addFood = async (req, res) => {
  const foodData = req.body 

  foodService.addFoodtoDB(foodData)

  res.send("Food Added to System!")
}

export default { searchFoodByName, addFood };
