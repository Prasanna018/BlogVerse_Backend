import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    autherId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        require: [true, 'title is require']

    },
    content: {
        type: String,
        require: [true, 'content is require']
    },
    coverImageUrl: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }],
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const BlogModel = mongoose.model("Blog", BlogSchema)
export default BlogModel
