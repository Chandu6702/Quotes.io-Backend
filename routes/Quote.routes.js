import { Router } from "express";
import { addQuote, findQuotes } from "../controllers/quote.controller.js"
import { verifyJWT } from "../middleware/authorization.js"

const router = Router()

router.post("/add-quote", verifyJWT, addQuote)
router.get("/quotes", verifyJWT, findQuotes)

export default router