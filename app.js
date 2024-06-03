import express from "express";
import cors from 'cors';
import UseRouter from "./routes/User.routes.js";
import cookieParser from 'cookie-parser'
import { verifyJWT } from "./middleware/authorization.js";


const app = express()

app.use(cors());
app.use(express.json())
app.use(cookieParser())

app.use(UseRouter)

app.post("/secret", (req, res) => {
    res.cookie("test", "leo", {
        httpOnly: true
    })
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    console.log(req.cookies);
    res.send("ok")
})

export default app