import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const ConnectionDb = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_STRING)
        if (response) {
            console.log("db connected")

        } else {
            console.log("db is not connected")
        }

    } catch (error) {
        console.error("error", error)

    }

}