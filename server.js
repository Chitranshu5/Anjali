import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

const app = express();
configDotenv();

app.get("/", (req, res) => {
  res.send({
    message: "HotPic.com Welcomes you",
  });
});

app.listen(process.env.PORT||5000, () => {
  console.log("Api is running");
});
