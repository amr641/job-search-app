import { Schema, Types, model } from "mongoose";
const appSchema = new Schema({
  jobId: {
    type: Types.ObjectId,
    // ref: "Job",
    required: true,
  },
  userId: {
    ref: "User",
    type: Types.ObjectId,
    required: true,
  },
  userTechSkills: {
    type: [String],
    required: true,
  },
  userSoftSkills: {
    type: [String],
    required: true,
  },
  userResume: String,
});
appSchema.post("init", function (doc) {
  // to make sure the url is fully qualified
  let str = "http://localhost:3000/uploads/";
  doc.userResume = str + doc.userResume;
  doc.jobId = undefined;
});
export const App = model("App", appSchema);
