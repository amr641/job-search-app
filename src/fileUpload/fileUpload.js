import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { appError } from "../utils/appError.js";

export const fileUpload = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });
  const fileFilter = (req, file, cb) => {
    const { mimetype } = file;
    if (mimetype == "application/pdf") return cb(null, true);
    cb(new appError(`only pdf allowed`), false);
  };

  const upload = multer({
    fileFilter,
    storage,
    limits: {
      fileSize: 4 * 1024 * 1024,
    },
  });
  return upload;
};
