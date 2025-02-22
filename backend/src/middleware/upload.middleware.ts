import multer from "multer";
import fs from "fs";
import path from "path";

// ✅ Ensure `uploads/` exists before saving files
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("📂 Created 'uploads' directory.");
}

// ✅ Configure Multer Storage (Disk)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Save files to `uploads/`
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// ✅ File filter to allow PDFs only
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;