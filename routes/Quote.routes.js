import { Router } from "express";
import { addQuote, getMyQuotes, likeQuote, disLikeQuote, getQuotes } from "../controllers/quote.controller.js"
import { verifyJWT } from "../middleware/authorization.js"

const router = Router()

router.get("/my-quotes", verifyJWT, getMyQuotes)
router.get("/quotes", verifyJWT, getQuotes)

router.post("/add-quote", verifyJWT, addQuote)
router.post("/like", verifyJWT, likeQuote)
router.post("/dislike", verifyJWT, disLikeQuote)

export default router