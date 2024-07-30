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
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

// Exporting Blog view
const blogViewSchema = new mongoose.Schema({
  ...blogSchema.obj,
  categoryValue: {
    type: String,
    default: "",
  },
});

const BlogView = mongoose.model("BlogView", blogViewSchema, "blogView");

BlogView.createCollection({
  viewOn: "blogs",
  pipeline: [
    {
      $lookup: {
        from: "categories", // The name of the categories collection
        localField: "categories",
        foreignField: "_id",
        as: "categoriesInfo",
      },
    },
    {
      $addFields: {
        categoryValue: {
          $reduce: {
            input: "$categoriesInfo",
            initialValue: "",
            in: {
              $concat: [
                "$$value",
                {
                  $cond: {
                    if: { $eq: ["$$value", ""] },
                    then: "",
                    else: ", ",
                  },
                },
                "$$this.name",
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        categoriesInfo: 0, // Exclude the categoriesInfo field from the output
      },
    },
  ],
});
module.exports = { Blog, BlogView };
