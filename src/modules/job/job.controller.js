import { App } from "../../../database/models/applicationModel.js";
import { Company } from "../../../database/models/companyModel.js";
import { Job } from "../../../database/models/jobModel.js";
import { catchError } from "../../middlewares/catchErrors.js";
import { appError } from "../../utils/appError.js";
import { sendErrorCompany } from "../company/company.controller.js";
// add job
const addJob = catchError(async (req, res) => {
  req.body.addedBy = req.user.userId;
  const job = await Job.insertMany(req.body);
  res.status(201).json({ message: "success" });
});
// update job
const updateJob = catchError(async (req, res, next) => {
  // must match the two condition by job id and the hr id
  const job = await Job.findOneAndUpdate(
    { $and: [{ _id: req.params.id }, { addedBy: req.user.userId }] },
    req.body,
    { new: true }
  );
  if (!job) return next(new appError("job not found", 404));
  res.status(200).json({ message: "success", job });
});
const deleteJob = catchError(async (req, res, next) => {
  // must match the two condition by job id and the hr id
  const job = await Job.findById(req.params.id);
  if (!job) return next(new appError("job not found", 404));
  let auth = job.addedBy == req.user.userId;
  if (!auth) return next(new appError("you are not allowed to access", 403));
  await job.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "success" });
});
// get all jobs of specific company
const getJobsOFCompany = catchError(async (req, res, next) => {
  const company = await Company.findOne({
    companyName: req.query.companyName,
  });
  if (!company) return sendErrorCompany(next);
  const relatedJobs = await Job.find(
    { addedBy: company.companyHR },
    { _id: 0, __v: 0 }
  );
  res.status(200).json({ message: "success", relatedJobs });
});
const filterJobs = catchError(async (req, res, next) => {
  const jobs = await Job.find({
    $or: [
      { workingTime: req.query.workingTime },
      { jobLocation: req.query.jobLocation },
      { jobTitle: req.query.jobTitle },
      { technicalSkills: req.query.technicalSkills },
      { seniorityLevel: req.query.seniorityLevel },
    ],
  });
  if (jobs.length == 0) return next(new appError("job not found", 404));
  res.status(200).json({ message: "success", jobs });
});
// send application
const applyToJob = catchError(async (req, res) => {
  req.body.userResume = req.file.filename;
  req.body.userId = req.user.userId;
  await App.insertMany(req.body);
  res.status(201).json({ message: "applyed for job successfully" });
});
// all jobs with company info
const getAllJobs = catchError(async (req, res) => {
  const jobs = await Job.find({}, { _id: 0, __v: 0 });
  // using the promise.all to wait for company to retrive her info
  const jobsWithCompany = await Promise.all(
    jobs.map(async (ele) => {
      const company = await Company.findOne(
        { companyHR: ele.addedBy },
        { companyHR: 0, _id: 0, __v: 0 }
      );
      let result = { ...ele, company: company };
      // pure result here to abstract result from un necessary details
      let pureRes = {
        job: result._doc,
        company: company,
      };
      return pureRes;
    })
  );

  res.status(200).json({ message: "success", jobsWithCompany });
});

export {
  addJob,
  updateJob,
  deleteJob,
  getJobsOFCompany,
  filterJobs,
  applyToJob,
  getAllJobs,
};
