import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const Session = new mongoose.model("Sessions", schema);

export default Session;