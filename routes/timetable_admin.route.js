import express from "express";
import {
  createPeriod,
  getClassTimetable,
  updatePeriod,
  deletePeriod,
  exportTimetableExcel,
  exportTimetablePDF,
  getStudentTimetable
} from "../controllers/timetable_admin.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Admin Timetable Routes
router.post("/create", verifyToken, createPeriod);
router.get("/class/:classId/section/:sectionId", verifyToken, getClassTimetable);
router.put("/:id", verifyToken, updatePeriod);
router.delete("/:id", verifyToken, deletePeriod);
router.get("/export/pdf/:classId/:sectionId", verifyToken, exportTimetablePDF);
router.get("/export/excel/:classId/:sectionId", verifyToken, exportTimetableExcel);
router.get("/timetable", verifyToken, getStudentTimetable);

export default router;
