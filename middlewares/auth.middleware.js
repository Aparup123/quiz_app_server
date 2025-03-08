const jwt=require("jsonwebtoken")
const Player = require("../models/player.model")
const { ApiError } = require("../utils/customResponse")

const isLoggedIn=async (req, res, next)=>{
    try{
        if(!req.cookies.accessToken){
            throw new ApiError("Access Denied!", 401)
        }
        const player=await jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET)
        if(!player){
            throw new ApiError("Invalid token", 401)
        }
        next()
    }catch(err){
        next(err)
    }
}

module.exports={
    isLoggedIn
}