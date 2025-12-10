import express from "express";
import {
  addSubject,
  assignTeacherToSubject,
  addPeriodSlot,
  generateTimetable,
  getClassTimetable,
  getTeacherTimetable
} from "../controllers/adminTimetable.controller.js";

const router = express.Router();

router.post("/subject/add", addSubject);
router.post("/subject/assign-teacher", assignTeacherToSubject);

router.post("/period/add", addPeriodSlot);

router.post("/generate", generateTimetable);

router.get("/class/:classId/:sectionId/:day", getClassTimetable);
router.get("/teacher/me", getTeacherTimetable);

export default router;
