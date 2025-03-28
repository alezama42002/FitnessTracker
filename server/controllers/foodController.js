import body from "express-validator";
import axios from "axios";
import dotenv from "dotenv";
import foodService from "../services/foodService.js";
import userService from "../services/userService.js";

dotenv.config();

const searchFoodByName = async (req, res) => {
  try {
    const { Name } = req.body;

    const response = await axios.get(
      "https://platform.fatsecret.com/rest/server.api",
      {
        params: {
          method: "foods.search",
          search_expression: `${Name}`,
          format: "json",
        },
        headers: {
          Authorization: `Bearer ${process.env.FATSECRET_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (
      (response.data.foods?.food?.total_results ??
        response.data.foods?.total_results) === "0"
    ) {
      res.status(404).json("No Food Exists!");
    } else {
      const foodData = response.data.foods.food;

      // Ensure foodData is always an array
      const foodsArray = Array.isArray(foodData) ? foodData : [foodData];

      const filteredData = foodsArray.map((food) => ({
        name: food.food_name || "Unknown Food",
        macros: food.food_description || "",
        brand: food.brand_name || "",
        ID: food.food_id || "Unknown ID",
      }));

      res.status(200).json(filteredData);
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Adds food to our database that's not in found in FatSecret's based on user input from form
const addFood = async (req, res) => {
  try {
    const foodData = req.body;

    if ((await foodService.getFoodID(foodData)) != false) {
      res.status(409).json("Food Already Exists!");
    } else {
      await foodService.addFoodtoDB(foodData);
      res.status(201).json("Food Added!");
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Allows admin to remove foods from the database
const deleteFood = async (req, res) => {
  try {
    const foodData = req.body;
    const { foodID, foodName } = foodData;

    if ((await foodService.getFood(foodID)) === null) {
      res.status(404).json("No Food with provided ID exists");
    } else {
      await foodService.deleteFood(foodID, foodName);
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Allows food to be edited by the user in the database
const editFood = async (req, res) => {
  try {
    const { foodID, updatedFields } = req.body;

    if ((await foodService.getFood(foodID)) === null) {
      res.status(404).json("No Food with provided ID exists");
    } else {
      await foodService.editFood(foodID, updatedFields);

      res.status(200).json("Food Edited");
    }
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Recommends food to the user based on what they are looking for (ex: high protein, high carbs, etc.)
const recommendFood = async (req, res) => {
  try {
    const { MacroRequest } = req.body;
    const foodRecs = await foodService.getRecommendedFood(MacroRequest);
    res.status(200).json(foodRecs);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

const getFoodByName = async (req, res) => {
  const food = await foodService.getFoodByName(
    req.body.foodName,
    req.body.foodBrand
  );

  res.status(200).json(food);
};

export default {
  searchFoodByName,
  addFood,
  deleteFood,
  editFood,
  recommendFood,
  getFoodByName,
};
