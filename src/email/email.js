import nodemailer from "nodemailer";
import { template } from "./emailTemplate.js";
import jwt from "jsonwebtoken";
import { catchError } from "../middlewares/catchErrors.js";
export const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amrgad395@gmail.com",
      pass: "lcqaskmrnstaetzu",
    },
  });

  const info = await transporter.sendMail({
    from: '"exam" <amrgad395@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "email confirmation ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>your otp is ${otp}</h1>`,
    // html body
  });
  console.log("Message sent: %s", info.messageId);
};
