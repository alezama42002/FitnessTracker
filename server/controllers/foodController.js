import axios from "axios";
import dotenv from "dotenv";
import foodService from "../services/foodService.js";

dotenv.config();

// Searches for foods based on the food name that is given by the user,
// foods are then returned along with some respective nutritional information
const searchFoodByName = async (req, res) => {
  const { Name, page } = req.body;
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const dbFoods = await foodService.getFoods(Name);

    const formattedDBFoods = dbFoods.map((food) => ({
      name: food.foodName || "Unknown Food",
      macros: food.Description || "",
      brand: food.foodBrand || "",
      ID: food.foodID,
    }));

    if (formattedDBFoods.length >= offset + limit) {
      return res.status(200).json({
        page: Number(page),
        results: limit,
        foods: formattedDBFoods.slice(offset, offset + limit),
      });
    }

    const remaining = offset + limit - formattedDBFoods.length;
    const fatsecretResults = [];

    let fatsecretPage = 0;
    while (fatsecretResults.length < remaining) {
      const response = await axios.get(
        "https://platform.fatsecret.com/rest/server.api",
        {
          params: {
            method: "foods.search",
            search_expression: `${Name}`,
            format: "json",
            max_results: 20,
            page_number: fatsecretPage,
          },
          headers: {
            Authorization: `Bearer ${process.env.FATSECRET_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const foodData = response.data.foods?.food;
      if (!foodData || foodData.length === 0) break;

      const foodsArray = Array.isArray(foodData) ? foodData : [foodData];
      const mapped = foodsArray.map((food) => ({
        name: food.food_name || "Unknown Food",
        macros: food.food_description || "",
        brand: food.brand_name || "",
        ID: food.food_id || "Unknown ID",
      }));

      fatsecretResults.push(...mapped);
      fatsecretPage += 1;
    }

    const combinedFoods = [...formattedDBFoods, ...fatsecretResults];
    const paginatedFoods = combinedFoods.slice(offset, offset + limit);

    if (combinedFoods.length === 0) {
      return res.status(404).json("No Food Exists!");
    }

    res.status(200).json({
      page: Number(page),
      results: paginatedFoods.length,
      foods: paginatedFoods,
    });
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Adds food to our database that's not in found in FatSecret's based on user input from form
const addFood = async (req, res) => {
  const foodData = req.body;
  try {
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
  const foodData = req.body;
  try {
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
  const { foodID, updatedFields } = req.body;
  try {
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
  const { MacroRequest } = req.body;
  try {
    const foodRecs = await foodService.getRecommendedFood(MacroRequest);
    res.status(200).json(foodRecs);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

// Gets food from database based on food name and brand
const getFoodByName = async (req, res) => {
  try {
    const food = await foodService.getFoodByName(
      req.body.foodName,
      req.body.foodBrand
    );
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: "Unexpected Internal Error!" });
  }
};

export default {
  searchFoodByName,
  addFood,
  deleteFood,
  editFood,
  recommendFood,
  getFoodByName,
};
