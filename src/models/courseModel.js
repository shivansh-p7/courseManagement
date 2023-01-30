const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId;
const Buffer=mongoose.Schema.Types.Buffer

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: objectId,
        ref:"user"
    },
    videoUrls: {
        type: [{
        part:Number,
        video:Buffer,
        pdfs:Buffer,
        quiz:Buffer
        }],
        requried: true
    },
    topics: {
        type: ["string"],
        requried: true
    },
    duration: {
        type: String,
        requried: true
    },
    category:{
     type:String,
      required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }


},{timestamps:true});

module.exports=mongoose.model("course",courseSchema);