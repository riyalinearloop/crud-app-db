const mongoose = require("mongoose");
const { Category } = require("../model/categorySchema");

const DB_URL = "mongodb://127.0.0.1:27017/crud-db";

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");
  await initializeCategories();
});

// Function to initialize categories
const initializeCategories = async () => {
  const categoryNames = [
    "Dev",
    "Devops",
    "Prod",
    "Stag",
    "Ui",
    "HealthCare",
    "AI-ML",
  ];

  try {
    for (const name of categoryNames) {
      await Category.updateOne(
        { name },
        { $setOnInsert: { name } },
        { upsert: true }
      );
    }
    console.log("Categories initialized");
  } catch (error) {
    console.error("Error initializing categories:", error);
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB Database Connected!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
