import { globalHandeling } from "./middlewares/globalHandeling.js";
import { verfifyToken } from "./middlewares/verifiyToken.js";
import { companyRouter } from "./modules/company/company.routes.js";
import { jobRouter } from "./modules/job/job.routes.js";
import { userRouter } from "./modules/user/user.routes.js";
import { appError } from "./utils/appError.js";

const bootstrab = (app) => {
  app.use("/users", userRouter);
  // app.use(verfifyToken);
  app.use("/company", companyRouter);
  app.use("/jobs", jobRouter);
  app.use("*", (req, res, next) => {
    next(new appError("not found", 404));
  });
  app.use(globalHandeling);
};
export default bootstrab;
