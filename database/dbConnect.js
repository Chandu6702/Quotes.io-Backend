import mongoose from 'mongoose'

async function dbConnect(){
    try{ 
        await mongoose.connect('mongodb+srv://chandrasekhara:chandu067@cluster0.6apvkj6.mongodb.net/quotes')
        console.log('connected to database')
    }
    catch(e){
        console.log("Failed to connect database")
    }
}

export default dbConnect

