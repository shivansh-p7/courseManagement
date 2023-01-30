const { application } = require("express");
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const route=require("./routes/route")

app.use(express.json());


mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://shivanshsharma:76Xjx6fMmlcP51HZ@shivansh-p7.zwfahec.mongodb.net/courseManagement")
.then(()=>{

console.log("mongoDB is connected")
})
.catch((err)=>{
    console.log(err)
})
;
app.use("/",route)

app.listen(process.env.PORT || 5000,()=>{

console.log(`server in running on port ${process.env.PORT || 5000}`)

})