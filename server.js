import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectToDatabase } from "./model/db.js";
import { Product } from "./model/product.model.js";
import { responseHelper } from "./util/helper.js";

const app = express();
configDotenv();

app.use(cors({origin:"*"}))
app.use(express.json())

// Database setup
connectToDatabase(); // Connecting database

app.get("/", (req, res) => {
  res.send({
    message: "HotPic.com Welcomes you",
  });
});

app.get("/emp", (req, res) => {
  try {
    res.send("<h1>HotPic Welcome you </h1>");
  } catch (error) {}
});

app.get("/category", (req, res) => {
  try {
    res.status(201).send({
      message: "This is category feild",
      data: [
        "Jewelery,Clothes,Medecine,Electrical,Mobile,Keybaord,Mouse,Cometic",
      ],
    });
  } catch (error) {}
});

app.post("/createProduct", async (req, res) => {
  try {
    console.log(req.body); // Logs the incoming product data

    // Create a new product instance
    const product = new Product(req.body);

    // Save the product to the database
    await product.save();

    // Send a success response
    responseHelper(res, 201, true, "Product registered successfully", {
      data: product,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging

    // Send an error response
    responseHelper(res, 500, false, "Error in the API", {
      error: error.message,
    });
  }
});


app.get("/getProducts", async (req, res) => {
  try {
    const data = await Product.find({});

    responseHelper(res, 201, true, "Fetch all data successfully", {
      data: data,
    });
  } catch (error) {
    console.log(error);
    responseHelper(res, 500, false, "Error in the api", {
      error: error.message,
    });
  }
});

app.get("/getProductcat", async (req, res) => {
  try {
    const { category } = req.query;
    
    console.log(category)

    // If category is provided, fetch data by category, otherwise fetch all data
    const query = category ? { category: category } : {};

    const data = await Product.find(query);

    responseHelper(res, 201, true, "Fetch data successfully", {
      data: data,
    });
  } catch (error) {
    console.log(error);
    responseHelper(res, 500, false, "Error in the API", {
      error: error.message,
    });
  }
});



app.listen(process.env.PORT || 5000, () => {
  console.log("Api is running");
});
