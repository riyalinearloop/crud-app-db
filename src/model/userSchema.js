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

// Create models
const User = mongoose.model("User", userSchema);

module.exports = { User };
