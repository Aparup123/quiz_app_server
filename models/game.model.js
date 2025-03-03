const mongoose=require("mongoose")

const gameSchema=new mongoose.Schema({
    players:[{
        type:[mongoose.Schema.ObjectId],
        ref: "Player"
    }],
    results:[
        {
            player_id:{
                type:mongoose.Schema.ObjectId,
                ref: 'Player'
            },
            answers:[String],
            score:Number
        }
    ]
})

const Game=mongoose.model("Game", gameSchema)
module.exports=Game