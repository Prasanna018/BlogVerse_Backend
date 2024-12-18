
import BlogModel from '../Models/Blog.Model.js'
import imagekit from "../utils/uploadImage.js";

export const CreateBlog = async (req, res) => {
    try {
        const userId = req.userId
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                message: "fill the fields",
                error: true,
                success: false

            })
        }
        const result = await imagekit.upload({
            file: req?.file?.buffer, // file buffer from Multer
            fileName: req?.file?.originalname,  // file name
            folder: '/coverImage',  // optional: specify a folder for image storage
        });


        const savaPost = new BlogModel({
            autherId: userId,
            title: title,
            content: content,
            coverImageUrl: result.url

        })
        const PostData = await savaPost.save();
        res.status(200).json({
            message: "Post Uploaded",
            success: true,
            error: false,
            PostData
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })


    }


}

export const updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        if (!title || !content) {
            return res.status(400).json({
                message: "fill the fields",
                error: true,
                success: false
            })
        }
        let result;
        if (req.file.buffer) {
            result = await imagekit.upload({
                file: req.file.buffer,  // file buffer from Multer
                fileName: req.file.originalname,  // file name
                folder: '/avatar',  // optional: specify a folder for image storage
            });


        }

        const updateBlog = await BlogModel.findOneAndUpdate({ _id: id }, {
            title,
            content,
            coverImageUrl: result.url
        }, { new: true, runValidators: true })
        const updateData = updateBlog

        if (updateBlog) {
            res.status(200).json({
                message: "Post Updated",
                error: false,
                success: true,
                updateData
            })
        }


    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })

    }




}

export const deletePost = async (req, res) => {
    try {

        const { id } = req.params;

        const Remove = await BlogModel.findByIdAndDelete({ _id: id });
        if (Remove) {
            res.status(200).json({
                message: "Post Deleted",
                success: true,
                error: false
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })

    }

}

export const getAllPosts = async (req, res) => {
    try {

        const Posts = await BlogModel.find({})
        if (!Posts) {
            return res.status(400).json({
                message: "Error while fetching posts",
                success: false,
                error: true
            })

        }
        res.status(200).json({
            message: "Posts fetched",
            success: true,
            error: false,
            Posts
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true
        })

    }

}

export const getUserPosts = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from middleware
        console.log(userId)
        // Fetch posts for the authenticated user
        const userPosts = await BlogModel.find({ autherId: userId });

        // Respond with a message and the list of user posts
        res.status(200).json({
            message: "Posts fetched",
            success: true,
            error: false,
            userPosts
        });
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true,
        });
    }

}