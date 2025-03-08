const express=require('express')
const { userSignUp, userSignIn, userSignOut, refreshTokens } = require('../controllers/auth.controller')
const { isLoggedIn } = require('../middlewares/auth.middleware')
const authRouter=express.Router()

authRouter.post('/signup', userSignUp)
authRouter.post('/signin', userSignIn)
authRouter.post('/signout', userSignOut)
authRouter.post('/refresh', refreshTokens)

authRouter.get('/s', (req, res)=>{
    res.send("Hello")
})
authRouter.get('/status',isLoggedIn,(req, res)=>{
    console.log("Hello")
    res.json({x:"y"})
})

module.exports=authRouter