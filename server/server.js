import express from "express";
const app = express();

import userRouter from "./routes/userRoutes.js";

app.use(express.json());

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
