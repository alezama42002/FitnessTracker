import { body, validationResult } from "express-validator";
import { handleValidationErrors } from "./userEndpointsValidator.js";

const validateSearch = [
  body("Name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Name must be between 1 and 100 characters"),

  handleValidationErrors,
];

const validateAddFood = [
  body("foodName")
    .exists()
    .withMessage("Food name is required")
    .isString()
    .withMessage("Food name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Food name must be between 1 and 100 characters"),

  body("foodName")
    .exists()
    .withMessage("Food brand is required")
    .isString()
    .withMessage("Food brand must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Food brand must be between 1 and 100 characters"),

  body("servingSize")
    .exists()
    .withMessage("Serving size is required")
    .isInt({ min: 1, max: 2000 })
    .withMessage("Serving size must be between 1 and 2000 grams"),

  body("Calories")
    .exists()
    .withMessage("Calories are required")
    .isFloat({ min: 0, max: 10000 })
    .withMessage("Calories must be between 0 and 10,000"),

  body("Protein")
    .exists()
    .withMessage("Protein is required")
    .isFloat({ min: 0, max: 500 })
    .withMessage("Protein must be between 0 and 500 grams"),

  body("Carbohydrates")
    .exists()
    .withMessage("Carbohydrates are required")
    .isFloat({ min: 0, max: 1000 })
    .withMessage("Carbohydrates must be between 0 and 1000 grams"),

  body("Fats")
    .exists()
    .withMessage("Fats are required")
    .isFloat({ min: 0, max: 500 })
    .withMessage("Fats must be between 0 and 500 grams"),

  body("Fiber")
    .exists()
    .withMessage("Fiber is required")
    .isFloat({ min: 0, max: 200 })
    .withMessage("Fiber must be between 0 and 200 grams"),

  ...[
    "VitaminA",
    "VitaminB6",
    "VitaminB12",
    "VitaminC",
    "VitaminD",
    "VitaminE",
    "VitaminK",
    "Calcium",
    "Iron",
    "Potassium",
    "Magnesium",
    "Sodium",
    "Zinc",
  ].map((nutrient) =>
    body(nutrient)
      .exists()
      .withMessage(`${nutrient} is required`)
      .isFloat({ min: 0, max: 10000 })
      .withMessage(`${nutrient} must be between 0 and 10,000 mg/µg`)
  ),

  handleValidationErrors,
];

const validateDeleteFood = [
  body("foodID")
    .exists()
    .withMessage("Food ID is required")
    .isInt({ min: 1 })
    .withMessage("Food ID must be a positive integer"),

  body("foodName")
    .exists()
    .withMessage("Food name is required")
    .isString()
    .withMessage("Food name must be a string")
    .isLength({ min: 1, max: 100 })
    .withMessage("Food name must be between 1 and 100 characters"),

  handleValidationErrors,
];

const validateEditFood = [
  body("foodID")
    .exists()
    .withMessage("Food ID is required")
    .isInt({ min: 1 })
    .withMessage("Food ID must be a positive integer"),

  body("updatedFields")
    .exists()
    .withMessage("Updated fields are required")
    .isObject()
    .withMessage("Updated fields must be an object"),

  body("updatedFields.*")
    .isFloat({ min: 0, max: 10000 })
    .withMessage("Each updated field must be a number between 0 and 10,000"),

  handleValidationErrors,
];

const validateRecommend = [
  body("MacroRequest")
    .exists()
    .withMessage("MacroRequest is required")
    .isString()
    .withMessage("MacroRequest must be a string")
    .isIn(["Low Fat", "High Protein", "Low Carb", "High Carb"])
    .withMessage(
      "MacroRequest must be one of: 'Low Fat', 'High Protein', 'Low Carb', 'High Carb'"
    ),

  handleValidationErrors,
];

export {
  validateSearch,
  validateAddFood,
  validateDeleteFood,
  validateEditFood,
  validateRecommend,
};
