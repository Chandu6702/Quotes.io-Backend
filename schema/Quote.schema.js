import mongoose from "mongoose";

const schema = new mongoose.Schema({
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
    likes: {
        type: Number,
        default: 0
    },
    liked_by: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    }
}, { timestamps: true })

schema.pre('findOneAndUpdate', async function (next) {
    if (this._update.$addToSet && this._update.$addToSet.liked_by) {
        const doc = await this.model.findOne(this.getQuery())
        if (doc)
            this._update.likes = doc.liked_by.length + 1;
    }

    if (this._update.$pull && this._update.$pull.liked_by) {
        const doc = await this.model.findOne(this.getQuery())
        if (doc)
            this._update.likes = doc.liked_by.length - 1;
    }
    next();
});

const Quote = mongoose.model("Quote", schema)

export default Quote