import multer from "multer"

import ApiError from "../utils/apiError.js"

const fileFilter = (_, file, cb) => {
  // Accept only pdf files
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept file
  } else {
    cb(new ApiError(400, "Only PDF files are allowed"), false) // Reject file
  }
};

const limits = { fileSize: 5 * 1024 * 1024 } // 5 MB Limit

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits
})

export default upload