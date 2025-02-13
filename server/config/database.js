import Sequelize from "sequelize";

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

// Creates sequelize instance in order to connect to database
const sequelize = new Sequelize(
  `mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:3306/${process.env.DATABASE_NAME}`
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
