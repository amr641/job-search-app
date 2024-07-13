import { Schema, Types, model } from "mongoose";

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    numberOfEmployees: { type: Number },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
    },
    companyHR: {
      type: Types.ObjectId,
      required: true,
    },
  },
  { strictPopulate: false }
);
companySchema.post("init", function (doc) {});

export const Company = model("Company", companySchema);
