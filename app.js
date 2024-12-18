import express from 'express'
const app = express();
import dotenv from 'dotenv'
import cors from 'cors'
// import { ConnectionDb } from './dbConfig/dbConfig.js';
// ConnectionDb()
dotenv.config()



// middlewares
import authRouter from './Routes/User.auth.Route.js'
import uploadImageRouter from './Routes/Images.Route.js'
import BlogRouter from './Routes/Blog.Route.js'
import LikeRouter from './Routes/Like.Route.js'
import CommentRouter from './Routes/Comment.Route.js'
app.use(express.json())
import cookieParser from 'cookie-parser';
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow credentials
}))


app.use('/auth', authRouter);
app.use('/image', uploadImageRouter);
app.use('/blog', BlogRouter);
app.use('/like', LikeRouter)
app.use('/comment', CommentRouter)

export default app;