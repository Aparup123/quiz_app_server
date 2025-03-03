const { GoogleGenerativeAI, SchemaType  } = require("@google/generative-ai");
const api_key=process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(api_key);
const model = genAI.getGenerativeModel(
    { model: "gemini-1.5-flash" ,
    generationConfig: {
    responseMimeType: "application/json",
  },});

const get10Quizzes=async (req, res)=>{
    console.log(api_key)
    const prompt = `Give me 10 quizzes with answers in JSON format
        quiz={
            id:String,
            question:String,
            options:{a:String, b:String, c:String, d:String}
            answer:{
                option:String,
                answer:String
            }           
        }
        Return: Array<quiz>
    `;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.json(JSON.parse(result.response.text()))
}














module.exports={
    get10Quizzes
}