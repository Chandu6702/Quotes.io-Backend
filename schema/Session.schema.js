import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: String,
        require: true,
        unique: true
    },
    refreshToken: {
        type: String,
        require: true,
        unique: true
    }
})

const Session = new mongoose.model("Sessions", schema);

export default Session;