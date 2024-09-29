import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectToDatabase } from "./model/db.js";

import { responseHelper } from "./util/helper.js";
import { Post } from "./model/post.model.js";

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


app.get("/allPost", async(req,res)=>{

  try {

    const data=  await Post.find();

    responseHelper(res,200,true,"All data fetched successfully",{data:data})
    
  } catch (error) {
    console.log(error);
    responseHelper(res, 500, false, "Error in the API", {
      error: error.message,
    });
  }
})


// Fetching the post from the id
app.get("/SinglePost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the post by ID
    let post = await Post.findById(id);

    // Check if the post exists
    if (!post) {
      return responseHelper(res, 404, false, "Post not found", {});
    }

    // Increment the views by 3
    post.views = (post.views || 0) + 1; // Ensure views is at least 0 before incrementing

    // Save the updated post with the incremented views
    await post.save();

    responseHelper(res, 200, true, "Post fetched and views incremented successfully", { post });
  } catch (error) {
    console.log(error);
    responseHelper(res, 500, false, "Error in fetching the post", {
      error: error.message,
    
    });
  }
});





app.listen(process.env.PORT || 5000, () => {
  console.log("Api is running");
});
