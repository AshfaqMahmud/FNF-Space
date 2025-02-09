const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;

// connect mongoose
mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect:",err));


app.get("/", (req, res) => {
  res.send("Social Media Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
