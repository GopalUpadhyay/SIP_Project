import asyncHandler from "express-async-handler";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase.js";

const uploadFile = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: false, message: "No file provided" });
    }

    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${req.file.originalname}`;
    const fileRef = ref(storage, fileName);

    // Upload file to Firebase
    const snapshot = await uploadBytes(fileRef, req.file.buffer);
    const downloadURL = await getDownloadURL(snapshot.ref);

    res.status(200).json({
      status: true,
      message: "File uploaded successfully",
      url: downloadURL,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      status: false,
      message: "File upload failed: " + error.message,
    });
  }
});

export { uploadFile };
