import express from 'express'
import {userLogin,userSignup} from './UserOperation.js'

const router=express.Router()

router.post('/signup',async (req,res)=>{
    const {email,password}=req.body;
    const response=await userSignup(email,password);
    res.send(response)
})

router.post('/login',async (req,res)=>{
    const {email,password}=req.body;
    const response=await userLogin(email,password);
    res.send(response)
})

export default router