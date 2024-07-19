const mongoose = require("mongoose");
const { STATUS } = require("../key");

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
      default: "",
    },
    status: {
      type: String,
      default: STATUS?.IN_DRAFT,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog };
