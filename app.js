import  express  from "express";
import cors from 'cors';
import UseRouter from "./routes/User/UserRoutes.js";

const app = express()
app.use(cors());
app.use(express.json())
app.use(UseRouter)
export default app