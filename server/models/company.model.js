import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
        type:String, //URL of company logo
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})

export const company = mongoose.model('company', companySchema);