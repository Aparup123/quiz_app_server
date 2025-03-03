const bcrypt=require('bcrypt')
const PLayer=require('../models/player.model')
const { generateAccessToken, generateRefreshToken } = require('../utils/auth.util')
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

module.exports={
    userSignUp
}