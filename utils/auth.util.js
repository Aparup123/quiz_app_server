
const jwt=require('jsonwebtoken')

const generateRefreshToken=(info)=>{
    const token=jwt.sign(info, process.env.JWT_SECRET, {expiresIn: "2d"})
    return token
}

const generateAccessToken=(info)=>{
    const token=jwt.sign(info, process.env.JWT_SECRET, {expiresIn: "15m"})
    return token
}

module.exports={
    generateAccessToken,
    generateRefreshToken
}