import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Name is require"]

    },
    email: {
        type: String,
        require: [true, "Email is require"]
    },
    password: {
        type: String,
        require: [true, "Password is require"],

    },
    bio: {
        type: String,
        default: ""
    },
    avatarUrl: {
        type: String,
        default: ""
    }


}, { timestamps: true })

const UserModel = mongoose.model("User", UserSchema)
export default UserModel;