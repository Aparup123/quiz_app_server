const mongoose=require('mongoose')

const playerSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Player=mongoose.model("Player", playerSchema)
module.exports=Player