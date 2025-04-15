// The following file's purpose is to start up the express server which is the server
// for the API. Requests are sent here and then sent to respective routers for respective
// handling.

import express from "express";
import userRouter from "./routes/userRoutes.js";
import foodRouter from "./routes/foodRoutes.js";
import recipeRouter from "./routes/recipeRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(cors());

// Allows the server to be listening for requests on port 3000
app.listen(3000, () => console.log("Server running on port 3000"));

// Seperate routes into multiple routers which handle multiple endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/recipe", recipeRouter);

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, "../client/dist")));

// Fallback for SPA routing (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
