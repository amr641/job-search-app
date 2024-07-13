import joi from "joi";

const signUpVal = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  recoveryEmail: joi.string().email().required(),
  DOB: joi.date().required(),
  mobileNumber: joi.string().required().length(11),
  role: joi.string(),
  status: joi.string(),
});
const logInVal = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
// email , mobileNumber , recoveryEmail , DOB , lastName , firstName
// update validation
const updateAccountVal = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email(),
  recoveryEmail: joi.string().email(),
  DOB: joi.date(),
  mobileNumber: joi.string().length(11),
});
// validation for search functionality
const userSearchVal = joi.object({
  firstName: joi.string().optional(),
  lastName: joi.string().optional(),
});
// update password validation
const updatePasswordVal = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
  confirmPassword: joi.valid(joi.ref("newPassword")).required(),
});
const forgetPasswordVal = joi.object({
  otp: joi.string().required(),
  newPassword: joi.string().required(),
});
const getAccountsVal = joi.object({
  recoveryEmail: joi.string().email().required(),
});

export {
  signUpVal,
  logInVal,
  updateAccountVal,
  userSearchVal,
  updatePasswordVal,
  forgetPasswordVal,
  getAccountsVal,
};
