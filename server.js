require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Cross-Origin Resource Sharing (CORS) is an HTTP header based mechanism
// that allows a server to indicate any origins (domain, scheme or port)
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser());


// 🔹 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));


// 🔹 Define a Schema & Model
const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model("User", UserSchema);

// 🔹 Routes (CRUD Operations)
// ✅ CREATE a new user
app.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// ✅ READ all users
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// ✅ READ one user by ID
app.get("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

// ✅ UPDATE a user
app.put("/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

// ✅ DELETE a user
app.delete("/users/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));