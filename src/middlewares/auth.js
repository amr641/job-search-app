import jwt from "jsonwebtoken";
import { appError } from "../utils/appError.js";
import bcrypt from "bcrypt";
import { User } from "../../database/models/userModel.js";
import { catchError } from "./catchErrors.js";
import dotEnv from "dotenv";
dotEnv.config();
export const secretKey = process.env.TOKEN_SECRET_KEY;

const checkEmail = async (req, res, next) => {
  const emailExistence = await User.findOne({ email: req.body.email });
  const isNumberInUse = await User.findOne({
    mobileNumber: req.body.mobileNumber,
  });
  // to check if email exist or not
  if (emailExistence)
    return next(new appError("email already exist please sign in", 409));
  // to ensure that the uniquness of the phone number
  else if (isNumberInUse)
    return next(new appError("mobile number in use", 409));

  const { firstName, lastName } = req.body;
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  req.body.userName = firstName + " " + lastName;
  next();
};
// login
const logIn = catchError(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { status: "online" }
  );

  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new appError("incorrect email or password", 401));

  jwt.sign(
    {
      userId: user.id,
      name: user.userName,
      email: user.email,
      status: user.status,
      role: user.role,
    },
    secretKey,
    async (error, token) => {
      res.status(200).json({ message: "logged in", token });
    }
  );
});
// check the old password and hash the new one
const checkPassword = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (!user || !bcrypt.compareSync(req.body.oldPassword, user.password))
    return next(new appError("your oldPassword is incorrect", 401));
  req.body.confirmPassword = bcrypt.hashSync(req.body.confirmPassword, 8);

  next();
};
// HR authorization
const hrAuth = catchError(async (req, res, next) => {
  const { role } = req.user;
  let auth = role == "companyHR";
  if (!auth) return next(new appError("you are not allowed to access", 403));
  next();
});
// make sure that he is user for some endpoints
const userAuth = catchError(async (req, res, next) => {
  const { role } = req.user;
  let auth = role == "user";
  if (!auth) return next(new appError("only user can apply", 403));
  next();
});

export { checkEmail, logIn, checkPassword, hrAuth, userAuth };
