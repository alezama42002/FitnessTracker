// The following file's purpose is to create the connection to the AWS database using
// Sequilize ORM. All database information is stored in .env file for security.

import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Creates sequelize instance in order to connect to database
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: 3306,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

export default sequelize;
