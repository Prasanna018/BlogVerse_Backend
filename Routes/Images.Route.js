import { Router } from "express";
const router = Router();
import authMiddleware from '../Middleware/authMiddleware.js';
import { upload_Avatar } from "../Controllers/Image.Controller.js";

import upload from "../Middleware/multer.js";

router.post('/upload-avatar', authMiddleware, upload.single('file'), upload_Avatar);

export default router