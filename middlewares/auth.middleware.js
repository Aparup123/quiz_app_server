const jwt=require("jsonwebtoken")
const Player = require("../models/player.model")

const isLoggedIn=async (req, res, next)=>{
    try{
        const player=await jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET)
        if(!player){
            return res.status(401).json({msg:"Invalid token"})
        }
        const playerInDB=await Player.findById(player.id)
        console.log(playerInDB)
        if(!playerInDB){
            return res.status(401).json({msg:"Unauthorized"})
        }
        next()
    }catch(err){
        return res.status(401).json({msg:"Error occurred"})
    }
}

module.exports={
    isLoggedIn
}