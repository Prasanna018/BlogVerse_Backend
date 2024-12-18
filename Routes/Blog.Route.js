import { Router } from "express";
const router = Router()


import upload from "../Middleware/multer.js";
import authMiddleware from '../Middleware/authMiddleware.js';
import { CreateBlog, deletePost, getAllPosts, getUserPosts, updatePost } from "../Controllers/Blog.Controller.js";


router.post('/create-post', authMiddleware, upload?.single('file'), CreateBlog)
router.put('/update-post/:id', authMiddleware, upload.single('file'), updatePost)
router.delete('/delete-post/:id', authMiddleware, deletePost)
router.get('/get-all-posts', getAllPosts);
router.get('/user-posts', authMiddleware, getUserPosts);

export default router;