// import express from "express";
// import { teacherDashboard } from "../controllers/teacher.controller.js";
// import { verifyToken } from "../utils/verifyUser.js";
// import {
//   getAssignedClasses,
//   getStudentsForClass,
//   markAttendance,
//   attendanceStatus,
//   attendanceSummary,
// } from "../controllers/teacher.controller.js";
// import {
//   createHomework,
//   getTeacherHomework,
//   updateHomework,
//   deleteHomework
// } from "../controllers/homework.controller.js";
// import {
//   getTeacherClasses,
//   getTeacherTimetable
// } from "../controllers/timetable.controller.js";

// const router = express.Router();

// router.get("/dashboard/:teacherId", verifyToken, teacherDashboard);
// router.get("/classes/:teacherId", verifyToken, getAssignedClasses);
// router.get("/class/students", verifyToken, getStudentsForClass);
// router.post("/attendance/mark", verifyToken, markAttendance);
// router.get("/attendance/status", verifyToken, attendanceStatus);
// router.get("/attendance/summary/:teacherId", verifyToken, attendanceSummary);
// router.post("/homework/create", verifyToken, createHomework);
// router.get("/homework/:teacherId", verifyToken, getTeacherHomework);
// router.put("/homework/update/:id", verifyToken, updateHomework);
// router.delete("/homework/delete/:id", verifyToken, deleteHomework);
// router.get("/timetable/classes/:teacherId", verifyToken, getTeacherClasses);
// router.get("/timetable/:teacherId", verifyToken, getTeacherTimetable);
// router.get("/attendance/students/:classId/:sectionId", verifyToken, teacherController.getStudentsForAttendance);

// router.post("/attendance/mark", verifyToken, teacherController.markAttendance);

// router.get("/attendance/date", verifyToken, teacherController.getAttendanceForDate);

// router.post("/attendance/update", verifyToken, teacherController.updateAttendance);

// router.get("/attendance/summary", verifyToken, teacherController.monthlySummary);
// router.post("/messages/broadcast", verifyToken, broadcastToClass);
// router.get("/circulars", verifyToken, getAllCirculars);
// router.get("/subjects", verifyToken, getTeacherSubjects);

// export default router;


import express from "express";
import { verifyToken } from "../utils/verifyUser.js";

import {
  teacherDashboard,
  getAssignedClasses,
  getStudentsForClass,
  getStudentsForAttendance,
  markAttendance,
  getAttendanceForDate,
  updateAttendance,
  monthlySummary,
  attendanceStatus,
  teacherLogin
} from "../controllers/teacher.controller.js";

import {
  createHomework,
  getTeacherHomework,
  updateHomework,
  deleteHomework,
} from "../controllers/homework.controller.js";

import {
  getTeacherClasses,
  getTeacherTimetable
} from "../controllers/timetable.controller.js";

import { getAllCirculars } from "../controllers/circular.controller.js";
import { broadcastToClass } from "../controllers/message.controller.js";
import { getTeacherSubjects } from "../controllers/teacher.controller.js";

const router = express.Router();

router.post("/login", teacherLogin);

router.get("/dashboard", verifyToken, teacherDashboard);

router.get("/classes", verifyToken, getAssignedClasses);

router.get("/class/:classId/:sectionId/students", verifyToken, getStudentsForClass);

router.get("/attendance/students/:classId/:sectionId", verifyToken, getStudentsForAttendance);
router.post("/attendance/mark", verifyToken, markAttendance);
router.get("/attendance/date", verifyToken, getAttendanceForDate);
router.post("/attendance/update", verifyToken, updateAttendance);
router.get("/attendance/status", verifyToken, attendanceStatus);
router.get("/attendance/summary", verifyToken, monthlySummary);

router.post("/homework", verifyToken, createHomework);
router.get("/homework", verifyToken, getTeacherHomework);
router.put("/homework/:id", verifyToken, updateHomework);
router.delete("/homework/:id", verifyToken, deleteHomework);

router.get("/timetable/:teacherId", verifyToken, getTeacherTimetable);
router.get("/timetable/classes/:teacherId", verifyToken, getTeacherClasses);

router.get("/circulars", verifyToken, getAllCirculars);
router.get("/subjects", verifyToken, getTeacherSubjects);

router.post("/messages/broadcast", verifyToken, broadcastToClass);

export default router;
