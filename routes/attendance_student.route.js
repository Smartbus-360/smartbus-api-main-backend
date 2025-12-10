import express from "express";
import { markAttendance, getAttendance } from "../controllers/Attendance_student.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/mark", verifyToken, markAttendance);
router.get("/:studentId", verifyToken, getAttendance);

export default router;
