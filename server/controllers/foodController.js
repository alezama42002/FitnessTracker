import body from "express-validator";
import axios from "axios";
import dotenv from "dotenv";

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

export default { searchFoodByName };
