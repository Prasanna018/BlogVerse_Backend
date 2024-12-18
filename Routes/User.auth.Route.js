import { Router } from "express";
const router = Router()
import { Register, Login, LogOut } from '../Controllers/Auth.Controller.js'
router.post('/register', Register)
router.post('/login', Login)
router.get('/logout', LogOut)

export default router