import { body, validationResult } from "express-validator";

// Middleware to check for validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorList = errors.array();

    // Check for missing fields (fields that are completely undefined)
    const missingFields = errorList.filter((error) =>
      error.msg.includes("is required")
    );

    // Return 400 for missing fields, otherwise 422 for invalid data
    const statusCode = missingFields.length > 0 ? 400 : 422;

    return res.status(statusCode).json({ errors: errorList[0] });
  }

  next();
};

const validateLogin = [
  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long")
    .notEmpty()
    .withMessage("Username cannot be empty"),

  body("Password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  handleValidationErrors,
];

const validateLogout = [
  body("Token")
    .exists()
    .withMessage("Token is required")
    .isString()
    .withMessage("Token must be a string")
    .notEmpty()
    .withMessage("Token cannot be empty"),

  handleValidationErrors,
];

const validateToken = [
  body("Token")
    .exists()
    .withMessage("Token is required")
    .isString()
    .withMessage("Token must be a string")
    .notEmpty()
    .withMessage("Token cannot be empty"),

  handleValidationErrors,
];

const validateValid = [
  body("Token")
    .exists()
    .withMessage("Token is required")
    .isString()
    .withMessage("Token must be a string")
    .notEmpty()
    .withMessage("Token cannot be empty"),

  handleValidationErrors,
];

const validateMacroRequest = [
  // Validation rules
  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4, max: 30 })
    .withMessage("Username must be at least 4 characters long"),

  body("Goal")
    .exists()
    .withMessage("Goal is required")
    .isIn([
      "Relaxed Weight Loss",
      "Normal Weight Loss",
      "Relaxed Weight Gain",
      "Normal Weight Gain",
    ])
    .withMessage(
      "Goal must be one of: 'Relaxed Weight Loss', 'Normal Weight Loss', 'Relaxed Weight Gain', 'Normal Weight Gain'"
    ),

  handleValidationErrors,
];

const validateAddUser = [
  // Validation rules
  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4, max: 30 })
    .withMessage("Username must be at least 4 characters long")
    .matches(/[a-zA-Z]/)
    .withMessage("Username must contain at least one letter"),

  body("Password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/)
    .withMessage("Password must contain at least one letter and one number"),

  body("Height")
    .exists()
    .withMessage("Height is required")
    .isInt({ min: 0, max: 300 })
    .withMessage("Height must be an integer between 0 and 300 cm")
    .toInt(),

  body("Weight")
    .exists()
    .withMessage("Weight is required")
    .isInt({ min: 0, max: 400 })
    .withMessage("Weight must be an integer between 0 and 400 kg")
    .toInt(),

  body("Age")
    .exists()
    .withMessage("Age is required")
    .isInt({ min: 0, max: 150 })
    .withMessage("Age must be an integer between 0 and 150 years")
    .toInt(),

  body("firstName")
    .exists()
    .withMessage("First Name is required")
    .isString()
    .withMessage("First Name must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("First Name must be at least 3 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First Name must contain only letters"),

  body("lastName")
    .exists()
    .withMessage("Last Name is required")
    .isString()
    .withMessage("Last Name must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("Last Name must be at least 3 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last Name must contain only letters"),

  body("activityLevel")
    .exists()
    .withMessage("Activity level is required")
    .isIn([
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
      "Extra Active",
      "Professional Athlete",
    ])
    .withMessage(
      "Activity level must be one of: 'Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active', 'Professional Athlete'"
    ),

  body("Gender")
    .exists()
    .withMessage("Gender is required")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be 'Male' or 'Female'"),
  handleValidationErrors,
];

const validateDeleteUser = [
  // Validation rules
  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4, max: 30 })
    .withMessage("Username must be at least 4 characters long"),

  handleValidationErrors,
];

const validateCheckUsername = [
  // Validation rules
  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4, max: 30 })
    .withMessage("Username must be at least 4 characters long"),

  handleValidationErrors,
];

const validateGetUserFoods = [
  // Validation rules
  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4, max: 30 })
    .withMessage("Username must be at least 4 characters long"),

  handleValidationErrors,
];

const validateLogFood = [
  // Validation rules
  body("foodID")
    .exists()
    .withMessage("Food ID is required")
    .isInt()
    .withMessage("Food ID must be an integer"),

  body("foodName")
    .exists()
    .withMessage("Food name is required")
    .isString()
    .withMessage("Food name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Food name must be between 2 and 100 characters"),

  body("Calories")
    .exists()
    .withMessage("Calories is required")
    .isInt({ min: 0 })
    .withMessage("Calories must be a positive integer"),

  body("Protein")
    .exists()
    .withMessage("Protein is required")
    .isInt({ min: 0 })
    .withMessage("Protein must be a non-negative integer"),

  body("Carbohydrates")
    .exists()
    .withMessage("Carbohydrates are required")
    .isInt({ min: 0 })
    .withMessage("Carbohydrates must be a non-negative integer"),

  body("Fats")
    .exists()
    .withMessage("Fats are required")
    .isInt({ min: 0 })
    .withMessage("Fats must be a non-negative integer"),

  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("Quantity")
    .exists()
    .withMessage("Quantity is required")
    .isFloat({ min: 1 })
    .withMessage("Quantity must be a positive value"),

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

  // String fields
  body("updatedFields.foodBrand")
    .optional()
    .isString()
    .withMessage("foodBrand must be a string"),

  body("updatedFields.foodName")
    .optional()
    .isString()
    .withMessage("foodName must be a string"),

  body("updatedFields.Description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  // Integer fields
  body("updatedFields.servingSize")
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage("servingSize must be an integer between 1 and 10,000"),

  body("updatedFields.Calories")
    .optional()
    .isInt({ min: 0, max: 10000 })
    .withMessage("Calories must be an integer between 0 and 10,000"),

  body("updatedFields.Protein")
    .optional()
    .isInt({ min: 0, max: 1000 })
    .withMessage("Protein must be an integer between 0 and 1,000"),

  body("updatedFields.Carbohydrates")
    .optional()
    .isInt({ min: 0, max: 1000 })
    .withMessage("Carbohydrates must be an integer between 0 and 1,000"),

  body("updatedFields.Fats")
    .optional()
    .isInt({ min: 0, max: 1000 })
    .withMessage("Fats must be an integer between 0 and 1,000"),

  body("updatedFields.Fiber")
    .optional()
    .isInt({ min: 0, max: 500 })
    .withMessage("Fiber must be an integer between 0 and 500"),

  // Vitamins & Minerals (general range 0–1000)
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
    "Magnesium",
    "Potassium",
    "Sodium",
    "Zinc",
  ].map((field) =>
    body(`updatedFields.${field}`)
      .optional()
      .isInt({ min: 0, max: 1000 })
      .withMessage(`${field} must be an integer between 0 and 1,000`)
  ),

  handleValidationErrors,
];

const validateDeleteLog = [
  body("userFood_ID")
    .exists()
    .withMessage("userFood_ID is required")
    .isInt({ min: 1 })
    .withMessage("userFood_ID must be a positive integer"),

  handleValidationErrors,
];

const validateGetCurrentNutrition = [
  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),

  handleValidationErrors,
];

const validateLogWeight = [
  body("Weight")
    .exists()
    .withMessage("Weight is required")
    .isInt({ min: 0, max: 400 })
    .withMessage("Weight must be between 0 and 400 kg"),

  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),

  ,
  handleValidationErrors,
];

const validateGetWeights = [
  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),

  handleValidationErrors,
];

const validateLogRecipe = [
  body("recipeName")
    .exists()
    .withMessage("Recipe name is required")
    .isString()
    .withMessage("Recipe name must be a string")
    .isLength({ min: 2, max: 100 })
    .withMessage("Recipe name must be between 2 and 100 characters"),

  body("Username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long"),

  body("Servings")
    .exists()
    .withMessage("Servings is required")
    .isFloat({ min: 1 })
    .withMessage("Servings must be a positive value"),

  body("Calories")
    .exists()
    .withMessage("Calories is required")
    .isInt({ min: 0 })
    .withMessage("Calories must be a positive integer"),
];

export {
  validateLogin,
  validateLogout,
  validateToken,
  validateValid,
  validateMacroRequest,
  validateAddUser,
  validateDeleteUser,
  validateCheckUsername,
  validateGetUserFoods,
  validateLogFood,
  validateEditLog,
  validateDeleteLog,
  validateGetCurrentNutrition,
  validateLogWeight,
  validateGetWeights,
  validateLogRecipe,
  handleValidationErrors,
};
