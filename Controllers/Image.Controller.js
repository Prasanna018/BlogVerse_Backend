

import UserModel from "../Models/User.Model.js";
import BlogModel from "../Models/Blog.Model.js";
import imagekit from "../utils/uploadImage.js";

export const upload_Avatar = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    try {
        // Upload image to ImageKit

        const userId = req.userId;
        const result = await imagekit.upload({
            file: req.file.buffer,  // file buffer from Multer
            fileName: req.file.originalname,  // file name
            folder: '/avatar',  // optional: specify a folder for image storage
        });

        // Return the uploaded image URL
        const save = await UserModel.findByIdAndUpdate(userId, {
            avatarUrl: result.url,

        })
        if (save) {
            res.status(200).json({
                url: result.url,  // ImageKit URL of the uploaded image
                message: 'Avatar uploaded successfully!',
                success: true,
                error: false

            });

        }

    } catch (error) {
        console.error('Error uploading to ImageKit:', error);
        res.status(500).send('Error uploading image');
    }


}

