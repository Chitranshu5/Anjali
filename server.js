import express from "express";
import cors from "cors";

const app = express();

app.get("/", (req, res) => {
  res.send({
    message: "HotPic.com Welcomes you",
  });
});

app.listen(9000, () => {
  console.log("Api is running");
});
