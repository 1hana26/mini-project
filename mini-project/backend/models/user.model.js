import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    og : Object,
    name : String,
    email : String,
    personal : String,
    prefer : String,
    pwd : String,
    phone :String
})

export const User = mongoose.model("User", UserSchema)