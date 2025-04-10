import foodService from "./foodService.js";
import axios from "axios";

// Checks to see if the food is already in the database and if its not then the
// needed information is retrieved and then the food is stored in the database for
// future use
const checkFood = async (foodData) => {
  // Gets the necessary foodID for the given food based on the food wishing to be logged.
  // Foods key nutrtional information is used to find ID.
  const foodResponse = await foodService.getFoodID({
    foodName: foodData.foodName,
    foodBrand: foodData.foodBrand,
    Calories: Math.round(foodData.Calories),
    Protein: Math.round(foodData.Protein),
    Carbohydrates: Math.round(foodData.Carbohydrates),
    Fats: Math.round(foodData.Fats),
  });

  // If food is not already in our Database, we store food in Database
  if (foodResponse === false) {
    // Gets foods information via API call to FatSecret using foodID given through req.body
    const response = await axios.get(
      "https://platform.fatsecret.com/rest/server.api",
      {
        params: {
          method: "food.get.v4",
          food_id: `${foodData.foodID}`,
          format: "json",
        },
        headers: {
          Authorization: `Bearer ${process.env.FATSECRET_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const servingOptions = response.data.food.servings.serving;
    const index = servingOptions.findIndex(
      (serving) => serving.serving_description === foodData.servingDescription
    );

    // Gets second serving option or first in the case that second is not present
    const food = response.data.food.servings.serving[index];

    // Filter data to only get the information needed
    const foodData_ = {
      foodBrand: response.data.food.brand_name || "",
      Description: response.data.food.food_description || "",
      foodName: response.data.food.food_name || "",
      servingSize: food.metric_serving_amount || 1,
      servingDescription: food.serving_description || "",
      Calories: food.calories ?? 0,
      Protein: food.protein ?? 0,
      Carbohydrates: food.carbohydrate ?? 0,
      Fats: food.fat ?? 0,
      Fiber: food.fiber ?? 0,
      VitaminA: food.vitamin_a ?? 0,
      VitaminB6: food.vitamin_b6 ?? 0,
      VitaminB12: food.vitamin_b12 ?? 0,
      VitaminC: food.vitamin_c ?? 0,
      VitaminD: food.vitamin_d ?? 0,
      VitaminE: food.vitamin_e ?? 0,
      VitaminK: food.vitamin_k ?? 0,
      Calcium: food.calcium ?? 0,
      Iron: food.iron ?? 0,
      Potassium: food.potassium ?? 0,
      Magnesium: food.magnesium ?? 0,
      Sodium: food.sodium ?? 0,
      Zinc: food.zinc ?? 0,
    };

    // Adds food to Database (Foods Table)
    await foodService.addFoodtoDB(foodData_);

    // Gets foodID of newly created Food in Food Table
    const finalFoodID = await foodService.getFoodID({
      foodName: foodData_.foodName,
      foodBrand: foodData_.foodBrand,
      Calories: Math.round(foodData_.Calories),
      Protein: Math.round(foodData_.Protein),
      Carbohydrates: Math.round(foodData_.Carbohydrates),
      Fats: Math.round(foodData_.Fats),
    });

    return finalFoodID;
  }
  return foodResponse;
};

export default { checkFood };
