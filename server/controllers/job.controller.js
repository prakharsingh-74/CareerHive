import { Job } from "../models/job.model.js";

//admin will post
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"something is missing",
                success:false
            })
        };
        
        // Create job entry
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(",").map(req => req.trim()), // Convert to array and trim whitespace
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error in postJob:", error);
        return res.status(500).json({
            message: "Server error while creating the job",
            success: false
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ]
        };
        const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt:-1});
        if(!jobs){
          return res.status(404).json({
            message:"jobs not found",
            success:false
          })
        };
        return res.status(200).json({
            jobs,
            success:true
        });
    
    } catch (error) {
        console.log(error);
    }
}


//students
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//jobs created by admin totally

export const getAdminJobs = async (req, res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId})
        if(!jobs){
            return res.status(404).json({
                message:"No job found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}