import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'

import UseRouter from "./routes/User.routes.js";
import QuoteRouter from "./routes/Quote.routes.js"


const app = express()

app.use(cors({
    origin: ["https://quotes-io.onrender.com"],
    credentials: true
}));
app.use(cookieParser())
app.use(express.json())

app.use(UseRouter)
app.use(QuoteRouter)

export default app