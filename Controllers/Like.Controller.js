import LikeModel from "../Models/Like.Model.js";


export const addLike = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;
        const existingLike = await LikeModel.findOne({
            autherId: userId,
            blogId: postId
        })

        if (existingLike) {
            return res.status(400).json({
                message: "You already Like this post",
                success: false,
                error: true
            })
        }
        const newLike = await LikeModel.create({
            autherId: userId,
            blogId: postId
        })

        res.status(200).json({
            message: "Liked",
            success: true,
            error: false

        })


    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })

    }

}

export const removeLike = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;

        const like = await LikeModel.findOneAndDelete({
            autherId: userId,
            blogId: postId
        })

        if (!like) {
            return res.status(400).json({
                message: "like not found",
                error: true,
                success: false
            })
        }

        res.status(200).json({
            message: "Like removed",
            success: true,
            error: false
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })

    }

}


export const countLikes = async (req, res) => {
    try {
        const { postId } = req.params;

        const countLikes = await LikeModel.countDocuments({ blogId: postId })
        res.status(200).json({
            message: "counted",
            postId,
            countLikes
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })

    }
}