import CommentModel from "../Models/Comment.Model.js";



export const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;
        const { content } = req.body
        if (!content) {
            return res.status(400).json({
                message: "write comment",
                success: false,
                error: true
            })
        }
        const saveComment = new CommentModel({
            autherId: userId,
            blogId: postId,
            content: content
        })
        res.status(200).json({
            message: "comment uploaded",
            success: true,
            error: false
        })
        await saveComment.save()

    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false

        })

    }


}

export const removeComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;
        const remove = await CommentModel.findOneAndDelete({
            autherId: userId,
            blogId: postId

        })
        if (remove) {
            res.status(200).json({
                message: "comment removed",
                success: true,
                error: false
            })
        }


    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false

        })

    }

}

export const countComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const countComments = await CommentModel.countDocuments({ blogId: postId });

        res.status(200).json({
            message: "counted",
            postId,
            countComments
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false

        })

    }
}