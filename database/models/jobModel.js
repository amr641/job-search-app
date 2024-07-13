import { Schema, Types, model } from "mongoose";
const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    enum: ["onsite", "remotely", "hybrid"],
    required: true,
  },
  workingTime: {
    type: String,
    enum: ["partTime", "fullTime"],
    required: true,
  },
  //seniorityLevel ( enum of Junior, Mid-Level, Senior,Team-Lead, CTO )
  seniorityLevel: {
    type: String,
    required: true,
    enum: ["junior", "midLevel", "senior", "teamLead", "cto"],
  },
  jobDescription: {
    type: String,
    required: true,
  },
  technicalSkills: {
    type: [String],
    required: true,
  },
  softSkills: {
    type: [String],
    required: true,
  },
  addedBy: {
    type: Types.ObjectId,
    ref: "Company",
    required: true,
  },
});
export const Job = model("Job", jobSchema);
