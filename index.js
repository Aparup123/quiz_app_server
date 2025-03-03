require('dotenv').config()
const express=require('express')
const quizRouter = require('./routes/quiz.route')
const connectDB = require('./utils/db.util')
const app=express()

connectDB()

const port=process.env.PORT||3000
app.use(express.json())
app.use('/quiz', quizRouter)
app.listen(port, ()=>{
    console.log("server started on port: ", port)
})