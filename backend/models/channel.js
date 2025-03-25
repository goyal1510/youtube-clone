import mongoose from "mongoose";

const channelSchema = mongoose.Schema({
    channelId: {type: String, required: true},
    description: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    subscribers:{type: Number, default:0},
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: "video"}]
})

const Channel  = mongoose.Schema("channel", channelSchema)

export default Channel