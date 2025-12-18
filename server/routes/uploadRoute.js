import express from "express";
import { uploadFile } from "../controllers/uploadController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected upload endpoint - user must be authenticated
router.post("/", protectRoute, uploadFile);

export default router;
