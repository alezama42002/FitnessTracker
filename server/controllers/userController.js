import body from "express-validator";
import axios from "axios";

const getMacros = (req, res) => {
  const { weight, height, age, gender, activityLevel } = req.body;
  let maintenanceCalories;
  let BMR;

  // Calculates BMR depending on given user information
  if (gender === "Male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calculate maintanence Calories based on BMR and activity level
  switch (activityLevel) {
    case "Sedentary":
      maintenanceCalories = 1.2 * BMR;
      break;
    case "Lightly Active":
      maintenanceCalories = 1.375 * BMR;
      break;
    case "Moderately Active":
      maintenanceCalories = 1.55 * BMR;
      break;
    case "Very Active":
      maintenanceCalories = 1.725 * BMR;
      break;
    case "Extra Active":
      maintenanceCalories = 1.9 * BMR;
      break;
    case "Professional Athlete":
      maintenanceCalories = 2.3 * BMR;
      break;
  }

  res.json({ MaintanenceCalories: maintenanceCalories });
};

const trackFood = (req, res) => {
  const { name } = req.body;
};

export default { getMacros, trackFood };
