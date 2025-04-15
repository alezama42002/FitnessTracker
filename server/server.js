import express from "express";
import userRouter from "./routes/userRoutes.js";
import foodRouter from "./routes/foodRoutes.js";
import recipeRouter from "./routes/recipeRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Create app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/recipe", recipeRouter);

// Serve static frontend (Vite build)
const clientDistPath = path.join(__dirname, "../client/dist");
app.use(express.static(clientDistPath));

// Catch-all to serve index.html for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
