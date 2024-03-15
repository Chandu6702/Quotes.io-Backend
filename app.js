import  express  from "express";
import UseRouter from "./routes/User/UserRoutes.js";

const app = express()
app.use(express.json())
app.use(UseRouter)
export default app