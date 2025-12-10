import express from "express";
import multer from "multer";
import {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
  updateMyProfilePicture
} from "../controllers/profileExtended.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads/profile_pictures"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Fetch profile
router.get("/me", getMyProfile);

// Update fields
router.put("/update", updateMyProfile);

// Change password
router.post("/change-password", changeMyPassword);

// Update profile picture
router.post("/picture", upload.single("profile_picture"), updateMyProfilePicture);

export default router;
