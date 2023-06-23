import express from "express";
import mongoose from "mongoose";
import { Request, Response } from "express";
import jobRoutes from "./routes/jobRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/JobPosting")
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Job Posting and Applicants Portal");
});

// using user routes
app.use("/api/users", userRoutes);

// using job routes
app.use("/api/jobs", jobRoutes);

app.listen(5000, () => {
  console.log("Server is running");
});
