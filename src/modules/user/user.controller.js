import { User } from "../../../database/models/userModel.js";
import { sendEmail } from "../../email/email.js";
import { catchError } from "../../middlewares/catchErrors.js";
import { appError } from "../../utils/appError.js";
// this function to apply DRY principle
const sendErrorUser = function (next) {
  return next(new appError("user not found", 404));
};
const signUp = catchError(async (req, res) => {
  const user = User.insertMany(req.body);
  res.status(201).json({ message: "success" });
});
// update account
const updateAccount = catchError(async (req, res) => {
  const { userId } = req.user;
  const user = await User.findByIdAndUpdate(userId, req.body);
  res.status(201).json({ message: "success", user });
});
// get user account data
const getUserData = catchError(async (req, res, next) => {
  const { userId } = req.user;
  const user = await User.findById(userId, { status: 0, role: 0, _id: 0 });
  if (!user) return sendErrorUser(next);
  user.password = undefined;
  res.status(200).json({ message: "success", user });
});
// search for user using query  params by firstaName or lastName
const searchForUser = catchError(async (req, res, next) => {
  const { firstName, lastName } = req.query;
  const user = await User.find({ $or: [{ firstName }, { lastName }] });
  if (user.length == 0)
    return next(
      new appError(
        `there is no user with this name ${req.query?.lastName || firstName}`
      )
    );
  res.status(200).json({ message: "success", user });
});
// update password
const updatePassword = catchError(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.userId, {
    password: req.body.confirmPassword,
  });
  if (!user) return sendErrorUser(next);
  res.status(201).json({ message: "success", user });
});
// forget password endpoint
const forgetPassword = catchError(async (req, res) => {
  const user = await User.findOneAndUpdate(
    { otp: req.body.otp },
    { password: req.body.newPassword }
  );
  if (!user) return sendErrorUser(next);
  res.status(201).json({ message: "success", user });
});
// restoring otp as you need it to access the forget password endpoint
const restoreOtp = catchError(async (req, res, next) => {
  // and reset the otp expire date
  let restoreDate = new Date().setMinutes(new Date().getMinutes() + 10);
  let newOtp = Math.floor(Math.random() * 1000000).toString();
  const user = await User.findByIdAndUpdate(req.user.userId, {
    otp: newOtp,
    otpExpireDate: restoreDate,
  });
  if (!user) return sendErrorUser(next);
  // send the new otp to the user email
  sendEmail(req.user.email, newOtp);
  res.status(201).json({ message: "otp restored successfully" });
});
// all accounts associated by recovery email
const getAccountsByTheRecovery = catchError(async (req, res, next) => {
  const users = await User.find({ recoveryEmail: req.params.recoveryEmail });
  if (users.length == 0) return sendErrorUser(next);

  res.status(200).json({ message: "success", users });
});
// only the user can delete his account
const deleteAccount = catchError(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.userId);
  if (!user) return sendErrorUser(next);
  res.status(200).json({ message: "success", user });
});
export {
  signUp,
  updateAccount,
  getUserData,
  searchForUser,
  updatePassword,
  forgetPassword,
  restoreOtp,
  getAccountsByTheRecovery,
  deleteAccount,
};
