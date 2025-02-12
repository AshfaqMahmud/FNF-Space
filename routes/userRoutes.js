const express = require("express");
const { getUserProfile, updateProfile, followUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", getUserProfile);
router.patch("/", authMiddleware, updateProfile);
router.post("/:id/follow", authMiddleware, followUser);

module.exports = router;
