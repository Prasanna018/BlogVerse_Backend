import UserModel from '../Models/User.Model.js'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "fill the fields",
                success: false,
                error: true
            })
        }

        const User = await UserModel.findOne({ email });


        if (User) {
            return res.status(400).json({
                message: "email is already used",
                success: false,
                error: true

            })
        }
        // console.log(User._id)
        const hashedPasword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPasword
        })

        await newUser.save();

        res.status(200).json({
            message: "User created successfully",
            success: true,
            error: false,
            newUser
        })


    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false,
            error: true
        })

    }

}

export const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "fill the fields",
            success: false,
            error: true
        })
    }
    const User = await UserModel.findOne({ email })
    if (!User) {
        return res.status(400).json({
            message: "User not found",
            success: false,
            error: true
        })
    }

    const comparePassword = await bcrypt.compare(password, User.password);
    if (!comparePassword) {
        return res.status(400).json({
            message: "Incorrect Password",
            success: false,
            error: true,


        })
    }
    const token = await jwt.sign({ id: User._id }, process.env.JWT_SECRETE, { expiresIn: '1h' });
    res.cookie('jwt', token).status(200).json({
        message: "Login successfull",
        success: true,
        error: false,
        user: {
            username: User.username,
            email: User.email
        }

    })



}


export const LogOut = async (req, res) => {
    try {
        const response = res.clearCookie('jwt')
        if (response) {
            res.status(200).json({
                message: "User Logout",
                success: true,
                error: false
            })
        } else {
            return res.status(400).json({
                message: "Logout unsuccessfull",
                error: true,
                success: false
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            error: true
        })

    }

}