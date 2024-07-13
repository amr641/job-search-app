import { Router } from "express";
import { checkStatus } from "../../middlewares/checkStatus.js";
import validate from "../../middlewares/validate.js";
import { verfifyToken } from "../../middlewares/verifiyToken.js";
import {
  addJobVal,
  applyVal,
  deleteJobVal,
  filteringJobsVal,
  getJobsOfCompVal,
  updateJobVal,
} from "./job.validation.js";
import * as jc from "./job.controller.js";
import { hrAuth, userAuth } from "../../middlewares/auth.js";
import { fileUpload } from "../../fileUpload/fileUpload.js";
export const jobRouter = Router();
const upload = fileUpload();
// verify token middlewarre
jobRouter.use(verfifyToken);
// check user is online or not
jobRouter.use(checkStatus);
// get all jobs with specfic company
jobRouter.get("/", validate(getJobsOfCompVal), jc.getJobsOFCompany);
// get all jobs with their company's information
jobRouter.get("/withCompany", jc.getAllJobs);
// fitering jobs
jobRouter.get("/filter", validate(filteringJobsVal), jc.filterJobs);
// validate(applyVal),
jobRouter.post(
  "/apply",
  upload.single("userResume"),
  validate(applyVal),
  userAuth,
  jc.applyToJob
);
// authorize with hr
jobRouter.use(hrAuth);
// add job
jobRouter.post("/", validate(addJobVal), jc.addJob);
// update job
jobRouter.patch("/:id", validate(updateJobVal), jc.updateJob);
// delete jon
jobRouter.delete("/:id", validate(deleteJobVal), jc.deleteJob);
