import mongoose, { Schema } from 'mongoose'

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    liked_quotes: {
        type: [Schema.Types.ObjectId],
        ref: "Quote",
        default: []
    }

}, { timestamps: true })

const User = new mongoose.model('Users', schema)

export default User
