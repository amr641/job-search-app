import { Router } from "express";
import { checkEmail, checkPassword, logIn } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import {
  forgetPasswordVal,
  getAccountsVal,
  logInVal,
  signUpVal,
  updateAccountVal,
  updatePasswordVal,
  userSearchVal,
} from "./userValidation.js";
import * as uc from "./user.controller.js";
import { checkStatus } from "../../middlewares/checkStatus.js";
import { verfifyToken } from "../../middlewares/verifiyToken.js";
import { otpVerify } from "../../middlewares/otp.verify.js";

export const userRouter = Router();
// user signing up
userRouter.post("/signUp", validate(signUpVal), checkEmail, uc.signUp);
// log in
userRouter.post("/logIn", validate(logInVal), logIn);
// forget password end point
userRouter.patch(
  "/forgetPassword",
  validate(forgetPasswordVal),
  otpVerify,
  uc.forgetPassword
);

// token verfication middleware
userRouter.use(verfifyToken);
// this middleware make sure that user is logged in

userRouter.use(checkStatus);
// update account
userRouter.patch("/", validate(updateAccountVal), uc.updateAccount);
// user get his data
userRouter.get("/", uc.getUserData);
// user search for another user by the first name
userRouter.get("/search", validate(userSearchVal), uc.searchForUser);
// update password
userRouter.patch(
  "/password/update",
  validate(updatePasswordVal),
  checkPassword,
  uc.updatePassword
);
// this get endpoint send the new otp to the user to access the forget password endpoint
userRouter.get("/restoreOtp", uc.restoreOtp);

userRouter.get(
  "/:recoveryEmail",
  validate(getAccountsVal),
  uc.getAccountsByTheRecovery
);
userRouter.delete("/", uc.deleteAccount);
