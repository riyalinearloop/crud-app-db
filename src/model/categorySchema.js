const mongoose = require("mongoose");

// Blog schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
