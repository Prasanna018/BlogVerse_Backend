import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req?.header?.authorization;
        // console.log(token)
        if (!token) {
            return res.status(400).json({
                message: "provide token",
                error: true,
                success: false
            })
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRETE);
        if (!decode) {
            return res.stats(400).json({
                message: "unauthorized access",
                success: false,
                error: true
            })
        }
        req.userId = decode.id
        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true
        })

    }


}

export default authMiddleware;