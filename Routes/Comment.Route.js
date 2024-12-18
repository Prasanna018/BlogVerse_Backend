import { Router } from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { addComment, countComments, removeComment } from "../Controllers/Comment.Controller.js";

const router = Router()

router.post('/add-comment/:id', authMiddleware, addComment);
router.delete('/remove-comment/:id', authMiddleware, removeComment);
router.get('/count-comments/:id', authMiddleware, countComments)


export default router