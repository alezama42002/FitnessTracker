import { body } from "express-validator";
import { handleValidationErrors } from "./userEndpointsValidator.js";

const validateAddRecipe = [
  body("Username")
    .isString()
    .withMessage("Username must be a string.")
    .notEmpty()
    .withMessage("Username is required."),

  body("recipeName")
    .isString()
    .withMessage("Recipe name must be a string.")
    .notEmpty()
    .withMessage("Recipe name is required."),

  body("recipeDescription")
    .isString()
    .withMessage("Recipe description must be a string.")
    .notEmpty()
    .withMessage("Recipe description is required."),

  body("totalServings")
    .isNumeric()
    .withMessage("Total servings is required and must be a number."),

  body("foodsData")
    .isArray({ min: 1 })
    .withMessage("foodsData must be a non-empty array."),

  body("foodsData.*.foodID")
    .isNumeric()
    .withMessage("Each foodID must be a number."),

  body("foodsData.*.servingSize")
    .isString()
    .withMessage("servingSize must be a string.")
    .notEmpty()
    .withMessage("servingSize is required."),

  body("foodsData.*.foodName")
    .isString()
    .withMessage("foodName must be a string.")
    .notEmpty()
    .withMessage("foodName is required."),

  body("foodsData.*.foodBrand")
    .isString()
    .withMessage("Each foodBrand must be a string."),

  body("foodsData.*.Calories")
    .isFloat({ min: 0 })
    .withMessage("Each Calories value must be a positive number."),

  body("foodsData.*.Protein")
    .isFloat({ min: 0 })
    .withMessage("Each Protein value must be a positive number."),

  body("foodsData.*.Carbohydrates")
    .isFloat({ min: 0 })
    .withMessage("Each Carbohydrates value must be a positive number."),

  body("foodsData.*.Fats")
    .isFloat({ min: 0 })
    .withMessage("Each Fats value must be a positive number."),

  body("foodsData.*.Quantity")
    .isFloat({ min: 0 })
    .withMessage("Each Quantity must be a positive number."),

  handleValidationErrors,
];

const validateDeleteRecipe = [
  body("recipeName")
    .isString()
    .withMessage("Recipe name must be a string.")
    .notEmpty()
    .withMessage("Recipe name is required."),

  handleValidationErrors,
];

const validateEditRecipe = [
  body("recipeName")
    .notEmpty()
    .withMessage("recipeName is required")
    .isString()
    .withMessage("recipeName must be a string"),

  body("updatedFields")
    .exists()
    .withMessage("Updated fields are required")
    .isObject()
    .withMessage("Updated fields must be an object"),

  // Optional fields with proper type validation
  body("updatedFields.recipeName")
    .optional()
    .isString()
    .withMessage("recipeName must be a string"),

  body("updatedFields.Description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("updatedFields.totalServings")
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage("totalServings must be an integer between 1 and 10,000"),

  body("updatedFields.totalCalories")
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage("totalCalories must be an integer between 0 and 10,000"),

  body("updatedFields.totalProtein")
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage("totalProtein must be an integer between 0 and 10,000"),

  body("updatedFields.totalCarbs")
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage("totalCarbs must be an integer between 0 and 10,000"),

  body("updatedFields.totalFats")
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage("totalFats must be an integer between 0 and 10,000"),

  body("updatedFields.totalFiber")
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage("totalFiber must be an integer between 0 and 10,000"),

  // Vitamins & Minerals (general range 0–10000)
  ...[
    "totalVitaminA",
    "totalVitaminB6",
    "totalVitaminB12",
    "totalVitaminC",
    "totalVitaminD",
    "totalVitaminE",
    "totalVitaminK",
    "totalCalcium",
    "totalIron",
    "totalMagnesium",
    "totalPotassium",
    "totalSodium",
    "totalZinc",
  ].map((field) =>
    body(`updatedFields.${field}`)
      .optional()
      .isInt({ min: 0, max: 10000 })
      .withMessage(`${field} must be an integer between 0 and 10,000`)
  ),

  handleValidationErrors,
];

const validateGetRecipe = [
  body("recipeName")
    .isString()
    .withMessage("Recipe name must be a string.")
    .notEmpty()
    .withMessage("Recipe name is required."),

  handleValidationErrors,
];

const validateReccomend = [
  body("MacroRequest")
    .exists()
    .withMessage("MacroRequest is required")
    .isString()
    .withMessage("MacroRequest must be a string")
    .isIn(["Low Fat", "High Protein", "Low Carb", "High Carb", "All"])
    .withMessage(
      "MacroRequest must be one of: 'Low Fat', 'High Protein', 'Low Carb', 'High Carb', 'All'"
    ),

  handleValidationErrors,
];

export {
  validateAddRecipe,
  validateDeleteRecipe,
  validateEditRecipe,
  validateGetRecipe,
  validateReccomend,
};
