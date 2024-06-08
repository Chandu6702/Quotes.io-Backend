import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
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
    likes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const Quote = new model("Quotes", schema)

export default Quote