import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.ObjectId,
        ref: "Blog"
    },
    autherId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        require: [true, 'content is require']

    }
}, { timestamps: true })

const CommentModel = mongoose.model('Comment', CommentSchema)
export default CommentModel