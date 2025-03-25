import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    text: String,
    user: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
