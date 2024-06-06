import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    }
}
)

const User = new mongoose.model('Users', schema)

export default User
