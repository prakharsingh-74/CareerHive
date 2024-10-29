import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Requirements:{
        type:String,
    },
    Salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Company'
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application'
        }
    ]
});

export const Job = mongoose.model("Job", jobSchema);