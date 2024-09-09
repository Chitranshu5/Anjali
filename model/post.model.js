import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    content: {
      type: String,
    },
    username: {
      type: String,
    },

    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Post = mongoose.model("Post", postSchema);

export { Post };
