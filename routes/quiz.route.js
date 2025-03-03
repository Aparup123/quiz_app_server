const express=require("express")
const quizRouter=express.Router()
const {get10Quizzes} =require('../controllers/quiz.controller')
quizRouter.get('/get-10-quizzes', get10Quizzes)

module.exports=quizRouter