const express = require("express");
const connectDB = require("./src/config/dbConnection");
const userRoutes = require("./src/routes/userRoute");
const blogRoutes = require("./src/routes/blogRoute");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/blogs", blogRoutes);

//Connect to MongoDB Database
connectDB()
  .then(() => {})
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on this ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Express Js project is running");
});
