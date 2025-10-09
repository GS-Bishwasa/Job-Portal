import express from "express";
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from "../controllers/userController.js";
import upload from "../config/multer.js";
import { requireAuth } from '@clerk/express';

const router = express.Router();

// Apply Clerk authentication middleware to all routes
router.use(requireAuth());

// get user data
router.get('/user', getUserData)

// apply for a job
router.post('/apply', applyForJob)

// get applied jobs data
router.get('/applications', getUserJobApplications)

// update user profile (resume)
router.post('/update-resume', upload.single('resume'), updateUserResume)

export default router