process.on("uncaughtException", (err) => {
  console.log("programming errors", err);
});
import express from "express";
import { dbConn } from "../database/dbConnection.js";
import bootstrab from "./bootstrab.js";
import { fileUpload } from "./fileUpload/fileUpload.js";

const app = express();
const port = 3000;
app.use(express.json());
bootstrab(app);
process.on("unHandeledRejection", (err) => {
  console.log(err);
});
app.listen(port, () => console.log(`app is running on port ${port}...`));
