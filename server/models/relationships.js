import User from "./usersModel";
import Meal from "./mealsModel";
import sequelize from "../config/database";

User.hasMany(Meal, { foreignKey: "userID" });
Meal.belongsTo(User, { foreignKey: "userID" });

sequelize.sync({ force: true }).then(() => {
  console.log("Database & Tables created");
});
