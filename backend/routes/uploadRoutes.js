import express from "express";
import { upload } from '../config/cloudConfig.js'
import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",authenticate,authorizeAdmin, upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ imageUrl: req.file.path });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
