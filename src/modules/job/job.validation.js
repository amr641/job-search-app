import joi from "joi";
const addJobVal = joi.object({
  jobTitle: joi.string().required(),
  jobLocation: joi.string().required(),
  workingTime: joi.string().required(),
  seniorityLevel: joi.string().required(),
  jobDescription: joi.string().required(),
  technicalSkills: joi.array().required(),
  softSkills: joi.array().required(),
  addedBy: joi.string().hex(),
});
const updateJobVal = joi.object({
  id: joi.string().hex().required(),
  jobTitle: joi.string(),
  jobLocation: joi.string(),
  workingTime: joi.string(),
  seniorityLevel: joi.string(),
  jobDescription: joi.string(),
  technicalSkills: joi.array(),
  softSkills: joi.array(),
});
const deleteJobVal = joi.object({
  id: joi.string().hex().required(),
});
const getJobsOfCompVal = joi.object({
  companyName: joi.string().required(),
});
const filteringJobsVal = joi.object({
  jobTitle: joi.string().required(),
  jobLocation: joi.string(),
  workingTime: joi.string(),
  seniorityLevel: joi.string(),
  jobDescription: joi.string(),
  technicalSkills: joi.string(),
  softSkills: joi.string(),
});
const applyVal = joi.object({
  jobId: joi.string().hex(),
  userId: joi.string().hex(),
  userTechSkills: joi.array(),
  userSoftSkills: joi.array(),
  userResume: joi.string(),
});
export {
  addJobVal,
  updateJobVal,
  deleteJobVal,
  getJobsOfCompVal,
  filteringJobsVal,
  applyVal,
};
