# 📂 Middleware

The middleware/ directory contains essential middleware functions that enhance security, authentication, and file handling in the application.

📌 Table of Contents
 • 📌 Authentication Middleware
 • 📌 File Upload Middleware
 • 📌 Summary

📌 Authentication Middleware

File: auth.middleware.ts
This middleware ensures that API requests are authenticated using JWT (JSON Web Token). It verifies tokens provided in the Authorization header and attaches the authenticated user’s details to the request object.

🔹 Key Function:
 • authenticate(req, res, next):
 • Extracts the JWT token from the Authorization header.
 • Decodes and verifies the token using the secret key.
 • Attaches the userId from the decoded token to the request.
 • Proceeds with the request if authentication is successful; otherwise, returns a 401 Unauthorized error.

```

🛠️ Example Usage:

import { authenticate } from "../middleware/auth.middleware";

app.get("/protected-route", authenticate, (req, res) => {
  res.json({ message: "This is a protected route!" });
});

🛠️ Example API Request:

GET /protected-route
Authorization: Bearer <JWT_TOKEN>

📤 Possible Responses:

✅ Success:

{
  "message": "This is a protected route!"
}

❌ Unauthorized (Invalid or Missing Token):

{
  "error": "Token is not valid"
}

```

📌 File Upload Middleware

File: upload.middleware.ts
This middleware handles file uploads securely and ensures that only PDF files are processed. It uses multer to store files in memory (instead of disk storage) to improve performance and enable easy integration with cloud storage solutions like AWS S3 or Google Cloud Storage.

🔹 Key Features:
 • Memory Storage: Files are stored in RAM instead of the file system.
 • PDF Validation: Ensures only application/pdf files are allowed.

🔹 Key Function:
 • upload.single("file"):
 • Processes single-file uploads.
 • Rejects non-PDF files with an error.

```
🛠️ Example Usage:

import upload from "../middleware/upload.middleware";

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully!", file: req.file });
});

🛠️ Example API Request:

POST /upload
Content-Type: multipart/form-data
File: document.pdf

📤 Possible Responses:

✅ Success:

{
  "message": "File uploaded successfully!",
  "file": {
    "originalname": "document.pdf",
    "mimetype": "application/pdf",
    "size": 204800
  }
}

❌ Invalid File Type:

{
  "error": "Only PDF files are allowed"
}
```

📌 Summary

The middleware/ directory contains critical middleware components that:

 1. Ensure secure authentication through JWT (auth.middleware.ts).
 2. Handle file uploads efficiently and enforce file type restrictions (upload.middleware.ts).

These middleware functions help secure API requests, manage file uploads, and improve performance in the backend.

✅ Next Steps: Modify or extend the middleware based on additional security or storage requirements.

💡 Notes:
 • The JWT secret (JWT_SECRET) must be defined in the .env file for authentication to work.
 • The file upload middleware currently stores files in memory. If persistent storage is needed, consider modifying it to use disk storage or cloud storage services.
