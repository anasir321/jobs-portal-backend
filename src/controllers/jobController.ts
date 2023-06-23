// create job route implementation
import { Request, Response } from "express";
import Job from "../models/jobs";

export const createJob = async (req: Request, res: Response) => {
  try {
    const {
      jobId,
      jobType,
      jobTitle,
      jobCity,
      jobDescription,
      jobCategory,
      companyName,
    } = req.body;

    const newJob = new Job({
      jobId,
      jobType,
      jobTitle,
      jobCity,
      jobDescription,
      jobCategory,
      companyName,
    });

    console.log(newJob);

    await newJob.save();
    res.status(200).json(newJob);
  } catch (err) {
    res.status(500).json({ error: `Cannot create job! ${err}` });
    throw new Error("Error in creating Job!");
  }
};

export const searchJobs = async (req: Request, res: Response) => {
  try {
    const { jobTitle, jobType, jobCity } = req.query;

    const query: any = {};

    if (jobTitle) {
      // case insensitive search
      query.jobTitle = { $regex: RegExp(jobTitle as string, "i") };
    }

    if (jobType) {
      query.jobType = { $regex: RegExp(jobType as string, "i") };
    }

    if (jobCity) {
      query.jobCity = { $regex: RegExp(jobCity as string, "i") };
    }

    const job = await Job.find(query);
    res.json(job);
  } catch (err) {
    res.json({ error: "No jobs found matching your criteria!" });
    throw new Error(err as string);
  }
};

export const viewJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find();

    console.log(jobs);
    res.status(200).json(jobs);
  } catch (err) {
    res.json({ error: "No jobs available at the moment!" });
    throw new Error(err as string);
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.body;

    console.log(jobId);

    const deletedJob = await Job.findOneAndDelete(jobId);

    if (!deletedJob) {
      return res
        .status(404)
        .json({ error: "Cannot find job with given jobId" });
    }
    res.status(200).json(`Job with jobId ${jobId} deleted!`);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while deleting the job" });
  }
};

export const updateJob = async (req: Request, res: Response) => {
    
};
