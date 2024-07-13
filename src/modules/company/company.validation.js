import joi from "joi";
const addCompanyVal = joi.object({
  companyName: joi.string().required(),
  description: joi.string().required(),
  industry: joi.string().required(),
  address: joi.string().required(),
  numberOfEmployees: joi.number().min(11).max(20).required(),
  companyEmail: joi.string().email().required(),
  companyHR: joi.string().hex(),
});
const updateCompanyVal = joi.object({
  companyName: joi.string(),
  description: joi.string(),
  industry: joi.string(),
  address: joi.string(),
  numberOfEmployees: joi.number().min(11).max(20),
  companyEmail: joi.string().email(),
});
const searchCompVal = joi.object({
  companyName: joi.string().required(),
});
const getCompanyByIdVal = joi.object({
  id: joi.string().hex().required(),
});
const deleteCompanyVal = joi.object({
  id: joi.string().hex().required(),
});
export {
  addCompanyVal,
  updateCompanyVal,
  searchCompVal,
  getCompanyByIdVal,
  deleteCompanyVal,
};
