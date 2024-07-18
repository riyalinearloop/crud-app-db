const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Blog schema
const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Create models
const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);

// Export both models
module.exports = { User, Blog };
