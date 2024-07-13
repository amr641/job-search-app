import { connect } from "mongoose";

export const dbConn = connect("mongodb://localhost:27017/routeExam")
  .then(() => {
    console.log("server connected successfully...");
  })
  .catch((err) => {
    console.log("err database connection", err);
  });
