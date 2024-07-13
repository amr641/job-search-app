import { appError } from "../utils/appError.js";
import { catchError } from "./catchErrors.js";
// this middleware checks if user online or offline
export const checkStatus = catchError(async (req, res, next) => {
  const { status, name } = req.user;

  if (status !== "online")
    return next(new appError("you must log in first", 403));
  next();
});
