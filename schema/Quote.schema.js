import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    quote: {
        type: String,
        require: true,
    },
    generes: {
        type: [String],
        default: [""],
        require: true
    }
})

const Quote = new mongoose.model("Quotes", schema)

export default Quote