// creating job routes
import { createJob, searchJobs, viewJobs, deleteJob, updateJob } from "../controllers/jobController";
import express from "express";

const router = express.Router();

// create user
router.post("/createJob", createJob);

// view jobs
router.get("/allJobs",viewJobs);

// search for a job using a query
router.get("/jobQuery", searchJobs);

// delete a job
router.delete("/deleteJob", deleteJob);

// update a job posting
router.put("/updateJob", updateJob)

export default router;
