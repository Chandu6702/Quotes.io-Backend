import mongoose from 'mongoose'

async function dbConnect() {
    try {
        await mongoose.connect('mongodb+srv://chandrasekhara:chandu067@cluster0.6apvkj6.mongodb.net/quotes')
        console.log('connected to database')
    }
    catch (e) {
        throw new Error("Failed to connect database")
    }
}

export default dbConnect

