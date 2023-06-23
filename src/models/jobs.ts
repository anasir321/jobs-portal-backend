import mongoose, { Document } from "mongoose";

interface Job extends Document {
    jobId: number,
    jobType: String,
    jobTitle: String,
    jobCity: String,
    jobDescription: String,
    jobCategory: string,
    companyName: String
};

const jobSchema = new mongoose.Schema<Job>({
    jobId: {
        type: Number,
        unique: true,
        required: true
    },
    jobType: {
        type: String,
        required: true  
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobCity: {
        type: String
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobCategory: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true
    }
});

export default mongoose.model<Job>('Job', jobSchema);