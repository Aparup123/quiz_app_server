
const jwt=require('jsonwebtoken')

const generateRefreshToken=(info)=>{
    const token=jwt.sign(info, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "5s"})
    return token
}

const generateAccessToken=(info)=>{
    const token=jwt.sign(info, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"})
    return token
}

module.exports={
    generateAccessToken,
    generateRefreshToken
}