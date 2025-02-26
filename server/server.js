// The following file's purpose is to start up the express server which is the server
// for the API. Requests are sent here and then sent to respective routers for respective
// handling.

import express from "express";

import userRouter from "./routes/userRoutes.js";
import foodRouter from ".//routes/foodRoutes.js";

/* ONLY UNCOMMENT IF CHANGES ARE MADE TO MODELS!
import sequelize from "./config/database.js";
import Food from "./models/foodModel.js";

sequelize.sync({ force: true });*/

const app = express();
app.use(express.json());

// Allows the server to be listening for requests on port 3000
app.listen(3000, () => console.log("Server running on port 3000"));

// Seperate routes into multiple routers which handle multiple endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
