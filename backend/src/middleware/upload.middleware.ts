import multer from "multer";

// ✅ Configure Multer to store files in memory (no disk storage)
const storage = multer.memoryStorage();

// ✅ File filter to allow only PDFs
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

// ✅ Set up Multer with memory storage & file filter
const upload = multer({ storage, fileFilter });

export default upload;