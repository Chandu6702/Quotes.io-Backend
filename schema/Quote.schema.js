import mongoose from "mongoose";

const schema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    quote: {
        type: String,
        required: true,
    },
    genres: {
        type: [String],
        default: [],
        required: true
    },
    liked_by: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    }
}, { timestamps: true })

const Quote = mongoose.model("Quote", schema)

export default Quote