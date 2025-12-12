import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { upload } from "../middleware/upload.middleware.js";
import {
  addExtraCurricular,
  getStudentExtraCurricular
} from "../controllers/extracurricular.controller.js";

const router = express.Router();

router.post(
  "/add",
  verifyToken,
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "certificate", maxCount: 1 }
  ]),
  addExtraCurricular
);

router.get("/student/:studentId", verifyToken, getStudentExtraCurricular);

export default router;
