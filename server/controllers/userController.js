import Job from "../models/job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/user.js"
import { v2 as cloudinary } from "cloudinary"

// Get user data
export const getUserData = async (req, res) => {
    const userId = req.auth.userId

    try {
        if (!userId) {
            return res.json({ success: false, message: "User ID is required" })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "User Not Found" })
        }

        res.json({ success: true, user })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Apply For Job
export const applyForJob = async (req, res) => {
    console.log('=== applyForJob called ===')
    console.log('req.body:', req.body)
    console.log('req.auth:', req.auth)
    console.log('req.headers:', req.headers)
    
    const { jobId } = req.body
    const userId = req.auth?.userId

    try {
        if (!userId) {
            console.log('❌ No userId in request')
            return res.json({ success: false, message: "User ID is required" })
        }

        console.log('✅ Checking if already applied - userId:', userId, 'jobId:', jobId)

        // Check if already applied
        const isAlreadyApplied = await JobApplication.findOne({ 
            jobId: jobId, 
            userId: userId 
        })

        if (isAlreadyApplied) {
            console.log('⚠️ User already applied to this job')
            return res.json({ success: false, message: "Already Applied to this job" })
        }

        console.log('✅ Not applied yet, fetching job data')
        const jobData = await Job.findById(jobId)
        
        if (!jobData) {
            console.log('❌ Job not found')
            return res.json({ success: false, message: "Job Not Found" })
        }

        console.log('✅ Job found:', jobData.title)
        console.log('✅ Creating application...')

        const application = await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        console.log('✅ Application created successfully:', application._id)
        res.json({ success: true, message: "Applied Successfully" })

    } catch (error) {
        console.error('❌ Error in applyForJob:', error)
        res.json({ success: false, message: error.message })
    }
}

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
    try {
        const userId = req.auth.userId

        if (!userId) {
            return res.json({ success: false, message: "User ID is required" })
        }

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: "No job applications found for this user" })
        }

        return res.json({ success: true, applications })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// update user profile(resume)
export const updateUserResume = async (req, res) => {
    try {
        const userId = req.auth.userId
        const resumeFile = req.file

        if (!userId) {
            return res.json({ success: false, message: "User ID is required" })
        }

        const userData = await User.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({ success: true, message: "Resume Updated" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}