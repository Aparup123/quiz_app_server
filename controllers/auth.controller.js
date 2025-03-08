const bcrypt=require('bcrypt')
const PLayer=require('../models/player.model')
const { generateAccessToken, generateRefreshToken } = require('../utils/auth.util')
const Player = require('../models/player.model')
const { ApiError } = require('../utils/customResponse')
const jwt=require('jsonwebtoken')

const userSignUp=async (req, res)=>{
    const {name, email, password}=req.body
    const passwordHash=bcrypt.hashSync(password, 5)
    const player=new PLayer({
        name,
        email,
        password:passwordHash
    })
    const savedPlayer=await player.save()
    const accessToken=generateAccessToken({name, id:savedPlayer._id})
    console.log("at:", accessToken)
    const refreshToken=generateRefreshToken({id:savedPlayer._id})
    savedPlayer.refresh_token=refreshToken
    await savedPlayer.save()

    res.status(200)
    res.cookie("accessToken", accessToken)
    res.cookie("refreshToken", refreshToken)
    res.send("Signed up successfully!")
}

const userSignIn=async (req, res, next)=>{
    const {email, password}=req.body
    try{
        const user=await Player.findOne({email})
        if(!user){
            throw new ApiError("No user found!", 401)
        }
        const passwordMatched=await bcrypt.compare(password, user.password)
        if(!passwordMatched){
            throw new ApiError("Incorrect Password!")
        }
        const refreshToken=generateRefreshToken({id:user._id})
        user.refresh_token=refreshToken
        await user.save()
        const accessToken=generateAccessToken({name:user.name, id:user._id})
        res.cookie("accessToken", accessToken)
        res.cookie("refreshToken", refreshToken)
        res.json("Signed in successfully.")
    }catch(err){
        next(err)
    }
    
}

// Controller for sign out
const userSignOut=(req, res, next)=>{
    try{
        res.cookie("accessToken", "")
        res.cookie("refreshToken", "")
        res.json("Signed out successfully")
    }catch(err){
        next(err)
    }
}


const refreshTokens = async(req, res, next)=>{
    try{
        const {refreshToken}=req.cookies
        const info=await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if(!info){
            throw new ApiError("Invalid token!", 401)
        }
        const user = await Player.findById(info.id)
        if(refreshToken!=user.refresh_token){
            throw new ApiError("Invalid token!", 401)
        }

        const newRefreshToken=generateRefreshToken({id:user._id})
        user.refresh_token=newRefreshToken
        await user.save()
       
        const accessToken=generateAccessToken({name:user.name, id:user._id})
        res.cookie("accessToken", accessToken)
        res.cookie("refreshToken", newRefreshToken)
        res.json("Token refreshed")
    }catch(err){
        next(err)
    }
    
}

module.exports={
    userSignUp,
    userSignIn,
    userSignOut,
    refreshTokens
}