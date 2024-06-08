import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"

dotenv.config()

import UseRouter from "./routes/User.routes.js";
import QuoteRouter from "./routes/Quote.routes.js"


const app = express()

app.use(cors({
    origin: [`${process.env.isDEV == 'true' ? process.env.DEV_FRONTEND_ORIGIN : process.env.DEP_FRONTEND_ORIGIN}`],
    credentials: true
}));
app.use(cookieParser())
app.use(express.json())

app.use(UseRouter)
app.use("/quote", QuoteRouter)

export default app