import mongoose from "mongoose";
import { App } from "../../../database/models/applicationModel.js";
import { Company } from "../../../database/models/companyModel.js";
import { Job } from "../../../database/models/jobModel.js";
import { catchError } from "../../middlewares/catchErrors.js";
import { User } from "../../../database/models/userModel.js";
import { appError } from "../../utils/appError.js";
// this function to apply DRY principle
export const sendErrorCompany = function (next) {
  return next(new appError("company not found", 404));
};
// add company
const addCompany = catchError(async (req, res) => {
  req.body.companyHR = req.user.userId;
  await Company.insertMany(req.body);
  res.status(201).json({ message: "success" });
});
// update company
const updateCompany = catchError(async (req, res, next) => {
  //only owner can update
  const company = await Company.findOneAndUpdate(
    {
      companyHR: req.user.userId,
    },
    req.body
  );
  if (!company) return sendErrorCompany(next);
  res.status(201).json({ messsage: "success", company });
});
// delete company
const deleteCompany = catchError(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) return sendErrorCompany(next);
  // make sure that only hr can delete the company
  let hrAuth = company.companyHR == req.user.userId;
  if (!hrAuth) return next(new appError("you are not allowed to access", 403));
  await Company.deleteOne({ _id: req.params.id });
  res.status(201).json({ messsage: "success" });
});
// search for company by name
const getCompanyByName = catchError(async (req, res, next) => {
  const { companyName } = req.query;
  const company = await Company.findOne({ companyName: companyName });
  if (!company) return sendErrorCompany(next);
  res.status(200).json({ message: "success", company });
});
// search for company by id
const getCompanyDataById = catchError(async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) return sendErrorCompany(next);
  let hrAuth = company.companyHR == req.user.userId;
  if (!hrAuth) return next(new appError("you are not allowed to access", 403));
  const relatedJobs = await Job.find({ addedBy: company.companyHR });
  res.status(200).json({ message: "success", company, relatedJobs });
});
// get all applications for specific job with user info
const getAppsForJob = catchError(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  // only the hr of hte company can access this end point to get applications of specfic job
  if (!job) return next(new appError("job not found", 404));
  const { addedBy } = job;
  if (addedBy != req.user.userId)
    // ensure that only the hr can see the applications
    return next(new appError("you are not allowed to access", 403));

  const applications = await App.find({ jobId: job._id }, { __v: 0, _id: 0 });
  // promise all handel multiple async operations
  let applicationsWithUserInfo = await Promise.all(
    applications.map(async (ele) => {
      let user = await User.findById(ele.userId, {
        _id: 0,
        status: 0,
        otpExpireDate: 0,
        role: 0,
      });
      user.password = undefined;
      let result = { ...ele, user };
      // to abstract the desired result
      let pureRes = {
        application: result._doc,
        user: user,
      };
      return pureRes;
    })
  );
  res.status(200).json(applicationsWithUserInfo);
});
export {
  addCompany,
  updateCompany,
  deleteCompany,
  getCompanyByName,
  getCompanyDataById,
  getAppsForJob,
};
