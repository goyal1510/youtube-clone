import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Video from "../models/video.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// GET all videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Server error while fetching videos" });
  }
});

//  UPLOAD a video
router.post("/upload", upload.fields([{ name: "video" }, { name: "thumbnail" }]), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: "Video and thumbnail are required!" });
    }

    const videoPath = `/uploads/${req.files.video[0].filename}`;
    const thumbnailPath = `/uploads/${req.files.thumbnail[0].filename}`;

    // Save video details in MongoDB
    const newVideo = await Video.create({
      title,
      description,
      videoUrl: videoPath,
      thumbnailUrl: thumbnailPath,
    });

    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  GET a single video
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });

    res.json(video);
  } catch (err) {
    console.error("Error fetching video:", err);
    res.status(500).json({ error: "Error fetching video" });
  }
});

router.put("/:id", async (req, res) => {
  try {
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedVideo);
  } catch (err) {
      res.status(500).json({ message: "Error updating video" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
      await Video.findByIdAndDelete(req.params.id);
      res.json({ message: "Video deleted successfully" });
  } catch (err) {
      res.status(500).json({ message: "Error deleting video" });
  }
});

export default router;
