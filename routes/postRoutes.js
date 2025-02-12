const express = require("express");
const { createPost, likePost } = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.post("/:id/like", authMiddleware, likePost);

module.exports = router;
