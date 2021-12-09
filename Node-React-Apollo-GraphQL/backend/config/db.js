const mongoose = require("mongoose")

const connectDB = async (URI)=>{
    try{
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useNewUrlParser:true
        })
       console.log("mongodb database connected")
    }catch(err){
        console.log(err)
    }
}


module.exports = connectDB