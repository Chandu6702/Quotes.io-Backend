import mongoose from 'mongoose'

const schema = mongoose.Schema({
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
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Quote",
        default: []
    }

}, { timestamps: true })

const User = mongoose.model('User', schema)

export default User
