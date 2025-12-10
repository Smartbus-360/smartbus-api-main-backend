import express from "express";
import { verifyToken } from "../utils/verifyUser.js";

import {
  getTeacherClasses,
  getTeacherTimetable
} from "../controllers/timetable.controller.js";

const router = express.Router();

// Teacher → list classes assigned
router.get("/classes/:teacherId", verifyToken, getTeacherClasses);

// Teacher → timetable for selected class
router.get("/:teacherId", verifyToken, getTeacherTimetable);

export default router;
