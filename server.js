import app from './app.js'
import dbConnect from './database/dbConnect.js'
import dotenv from "dotenv"

dotenv.config()


dbConnect().then(() => {
    app.listen(3000, () => {
        console.log('Server is running');
    })
}).catch((error) => {
    console.log(error);
})