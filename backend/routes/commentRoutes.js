import express from "express";
import Comment from "../models/comment.js"; // Import your Comment model

const router = express.Router();

//  Add Comment
router.post("/:videoId", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Comment text is required!" });

        const newComment = await Comment.create({
            text,
            videoId: req.params.videoId,
        });

        res.status(201).json(newComment);
    } catch (err) {
        console.error("Error adding comment:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//  Get Comments for a Video
router.get("/:videoId", async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.json(comments);
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete Comment
router.delete("/:commentId", async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.commentId);
        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//  Edit Comment
router.put("/:commentId", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Text is required!" });

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            { text },
            { new: true }
        );

        res.json(updatedComment);
    } catch (err) {
        console.error("Error updating comment:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
