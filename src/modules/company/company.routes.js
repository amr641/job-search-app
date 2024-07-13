import { Router } from "express";
import validate from "../../middlewares/validate.js";
import {
  addCompanyVal,
  deleteCompanyVal,
  getCompanyByIdVal,
  searchCompVal,
  updateCompanyVal,
} from "./company.validation.js";
import * as cc from "./company.controller.js";
import { hrAuth } from "../../middlewares/auth.js";
import { checkStatus } from "../../middlewares/checkStatus.js";
import { verfifyToken } from "../../middlewares/verifiyToken.js";

export const companyRouter = Router();
// verify token middlewarre
companyRouter.use(verfifyToken);
// check user is online or not
companyRouter.use(checkStatus);
// search for company
companyRouter.get("/", validate(searchCompVal), cc.getCompanyByName);
//this for apply authorization with role ( Company_HR)
companyRouter.use(hrAuth);
// add company by HR
companyRouter.post("/", validate(addCompanyVal), cc.addCompany);
// update company by HR
companyRouter.patch("/", validate(updateCompanyVal), cc.updateCompany);
// delete company by HR
companyRouter.delete("/:id", validate(deleteCompanyVal), cc.deleteCompany);
// get all applications for specific job
companyRouter.get("/apps/:id", validate(getCompanyByIdVal), cc.getAppsForJob);
// get company by id
companyRouter.get("/:id", validate(getCompanyByIdVal), cc.getCompanyDataById);
