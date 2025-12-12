import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addStudentStrength,
  addStudentWeakness,
  getStudentAnalysis
} from "../controllers/studentAnalysis.controller.js";

const router = express.Router();

router.post("/strength/add", verifyToken, addStudentStrength);
router.post("/weakness/add", verifyToken, addStudentWeakness);
router.get("/:studentId", verifyToken, getStudentAnalysis);

export default router;
