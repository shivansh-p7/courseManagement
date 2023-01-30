const CourseModel=require("../models/courseModel");
const userModel=require("../models/userModel");



const createCourse=async (req,res)=>{
try{
    const courseData=req.body;
    if(Object.keys(courseData).length==0) return res.status(400).send({status:false,message:"please provide required data"})
    const {title,description,userId,videoUrl,topics,duration,category}=courseData;
    






} catch (error) {
        return res.status(500).send({ status: false, error: error.message });

    }

}

module.exports={createCourse}


