import { Router } from "express";
import { addQuote } from "../controllers/quote.controller.js"
import { verifyJWT } from "../middleware/authorization.js"

const router = Router()

router.post("/add-quote", verifyJWT, addQuote)

export default router