import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
   
    name: {
      type: String,
    //   required: true,
    },
    price: {
      type: Number,
    //   required: true,
    },
    category: {
      type: String,
    //   required: true,
    },
    description: {
      type: String,
    //   required: true,
    },
    image: {
      type: String, // URL or file path to the product image
    //   required: true,
    },
    stock: {
      type: Number, // Tracks how many items are in stock
      default: 0,
    },
    rating: {
      type: Number, // Average rating for the product
      default: 0,
    },
    numReviews: {
      type: Number, // Number of reviews received
      default: 0,
    },
    discount: {
      type: Number, // Discount percentage, if any
      default: 0,
    },
    brand: {
      type: String, // Optional brand name
    },
    tags: [String], // Tags for filtering like 'new', 'trending', 'sale', etc.
   

  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model("Product", productSchema);

export { Product };
