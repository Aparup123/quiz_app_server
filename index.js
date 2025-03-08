require('dotenv').config()
const express=require('express')
const cookieParser=require('cookie-parser')
const quizRouter = require('./routes/quiz.route')
const connectDB = require('./utils/db.util')
const authRouter = require('./routes/auth.route')
const errorHandler = require('./middlewares/errorHandler')
const app=express()

connectDB()

const port=process.env.PORT||3000

app.use(express.json())
app.use(cookieParser())
app.use('/quiz', quizRouter)
app.use('/auth', authRouter)

app.use(errorHandler)
app.listen(port, ()=>{
    console.log("server started on port: ", port)
})