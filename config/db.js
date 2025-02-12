const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("MongoDB connected");
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};

// mongoose
//   .connect("mongodb://localhost:27017/")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect:", err));


module.exports = connectDB;