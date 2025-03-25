import express from "express";
import mongoose from "mongoose";
import Comment from "../models/comment.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

// Get Comments for a Video
// Get comments by videoId
router.get("/:videoId", async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId }).populate("userId", "username avatar");
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: "Error fetching comments" });
    }
});

// Add a Comment (Requires Authentication)
router.post("/:videoId", verifyToken, async (req, res) => {
    try {
        const { videoId } = req.params;
        const { text } = req.body;

        // Validate videoId format
            // Validate videoId format
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        return res.status(400).json({ error: "Invalid videoId format" });
    }

    const newComment = await Comment.create({
        text,
        userId: req.user.id,  // `authMiddleware` should set req.user
        videoId: new mongoose.Types.ObjectId(videoId),
    });

    res.status(201).json(newComment);
} catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Server error while adding comment" });
}
});

export default router;
