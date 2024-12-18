import mongoose from "mongoose";
const LikeSchema = new mongoose.Schema({
    autherId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    blogId: {
        type: mongoose.Schema.ObjectId,
        ref: "Blog"
    }
}, { timestamps: true })

const LikeModel = mongoose.model("Like", LikeSchema)

export default LikeModel;