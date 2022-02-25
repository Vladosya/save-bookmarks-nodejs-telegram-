import express from "express";
import mongoose from "mongoose";
import categoryRouter from "./Category/categoryRouter.js";

import "dotenv/config";

const app = express();

app.use(express.json());
app.use("/api-v1", categoryRouter);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(process.env.PORT, () => {
      console.log("starting server on PORT", process.env.PORT);
    });
  } catch (e) {
    console.log("Error in startApp func --------------> ", e);
  }
};

startApp();
