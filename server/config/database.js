import Sequelize from "sequelize";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

// Creates sequelize instance in order to connect to database
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST, // Your AWS RDS or EC2 instance endpoint
    port: 3306, // Explicitly defining the port
    dialect: "mysql",
  }
);

// Tests the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established");
  })
  .catch((error) => {
    console.error("Unable to connect to database: ", error);
  });

export default sequelize;
