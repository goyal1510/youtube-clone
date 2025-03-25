import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/comments.js";
import path from "path"
import { fileURLToPath } from "url";
// import channelRoutes from "./routes/channelRoutes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
// app.use("/api/channels", channelRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" MongoDB Connected"))
    .catch(err => console.error("MongoDB Error:", err));

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
