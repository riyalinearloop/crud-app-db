const express = require("express");
const connectDB = require("./config/dbConnection");
const userRoutes = require("./routes/userRoute");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/user", userRoutes);

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
