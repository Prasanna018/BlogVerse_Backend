import { Router } from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { addLike, countLikes, removeLike } from "../Controllers/Like.Controller.js";
const router = Router()

router.get('/add-like/:id', authMiddleware, addLike);
router.delete('/remove-like/:id', authMiddleware, removeLike);
router.get('/count-like/:id', authMiddleware, countLikes);


export default router