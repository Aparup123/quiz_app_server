const { ApiError } = require("../utils/customResponse")

const errorHandler=(err, req, res, next)=>{
    console.log("************* API ERROR ****************")
    console.log(err)
    console.log("************* API ERROR END ****************")
    if(err.name=="TokenExpiredError"){
        res.status(401).json("Token expired! refresh it")
    }
    if(err instanceof ApiError){
        res.status(err.status)
    }
    else{
        res.status(500)
    }
    return res.json(err.message)
}

module.exports=errorHandler