import { User } from "../../database/models/userModel.js";
import { appError } from "../utils/appError.js";
import { catchError } from "./catchErrors.js";
import bcrypt from "bcrypt";

export const otpVerify = catchError(async (req, res, next) => {
  const user = await User.findOne({ otp: req.body.otp });
  let expiration = user.otpExpireDate > new Date();
  if (user && expiration) {
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8);
    next();
  } else {
    next(new appError("invalid otp", 403));
  }
});
