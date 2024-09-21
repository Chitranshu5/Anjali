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



app.get("/HindiVartraKatha", async (req, res) => {
  try {
    const data = [
      {
        title: "श्री सत्यनारायण व्रत कथा",
        description: "सत्यनारायण व्रत में सत्य और धर्म का पालन कर भगवान विष्णु की पूजा की जाती है। इससे जीवन में सुख-समृद्धि और शांति प्राप्त होती है।",
      },
      {
        title: "करवा चौथ व्रत कथा",
        description: "यह व्रत विशेष रूप से सुहागिन महिलाएं अपने पति की लंबी उम्र और सुखमय जीवन के लिए करती हैं। करवा चौथ की कथा सुनने का विशेष महत्त्व है।",
      },
      {
        title: "छठ पूजा व्रत कथा",
        description: "यह व्रत सूर्य भगवान को समर्पित होता है। इसमें विशेष प्रकार के प्रसाद और जल से सूर्य देवता की पूजा की जाती है।",
      },
      {
        title: "सोमवार व्रत कथा",
        description: "सोमवार व्रत भगवान शिव को समर्पित होता है। इस व्रत को करने से इच्छाओं की पूर्ति होती है और जीवन में शांति आती है।",
      },
      {
        title: "एकादशी व्रत कथा",
        description: "भगवान विष्णु को समर्पित एकादशी व्रत को धर्म और भक्ति का प्रतीक माना जाता है। इस व्रत से मोक्ष की प्राप्ति होती है।",
      },
      {
        title: "महाशिवरात्रि व्रत कथा",
        description: "महाशिवरात्रि भगवान शिव की पूजा का प्रमुख त्योहार है। यह व्रत भगवान शिव की कृपा प्राप्त करने और जीवन में शक्ति पाने के लिए किया जाता है।",
      },
      {
        title: "गणगौर व्रत कथा",
        description: "यह व्रत मुख्य रूप से राजस्थान में मनाया जाता है। इसमें महिलाएं अपने पति की लंबी आयु और सुखमय जीवन के लिए पूजा करती हैं।",
      },
      {
        title: "सावित्री व्रत कथा",
        description: "सावित्री व्रत में स्त्रियां अपने पति की लंबी उम्र और उनकी सुरक्षा के लिए व्रत रखती हैं। सावित्री और सत्यवान की कथा इस व्रत से जुड़ी हुई है।",
      },
      {
        title: "हरतालिका तीज व्रत कथा",
        description: "यह व्रत भगवान शिव और माता पार्वती की पूजा के लिए किया जाता है। इसमें विवाहित स्त्रियां अपने सुखद वैवाहिक जीवन की कामना करती हैं।",
      },
      {
        title: "नवरात्रि व्रत कथा",
        description: "नवरात्रि देवी दुर्गा की उपासना के लिए किया जाने वाला व्रत है। इसमें नौ दिनों तक देवी के नौ रूपों की पूजा की जाती है।",
      },
    ];

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
