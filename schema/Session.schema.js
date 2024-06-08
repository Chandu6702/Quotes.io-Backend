import mongoose from "mongoose";

const schema = mongoose.Schema({
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

const Session = mongoose.model("Session", schema);

export default Session;