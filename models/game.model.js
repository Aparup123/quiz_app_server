const mongoose=require("mongoose")

const gameSchema=new mongoose.Schema({
    players:{
        type:[mongoose.Schema.ObjectId],
        ref: "Player"
    },
    answers:[
        {
            player:{
                type:mongoose.Schema.ObjectId,
                ref: 'Player'
            },
            answers:[String]
        }
    ]
})

const Game=mongoose.model("Game", gameSchema)
module.exports=Game