// import express from "express";
// import { parentDashboard } from "../controllers/parent.controller.js";
// import { verifyToken } from "../utils/verifyUser.js";

// const router = express.Router();

// router.get("/dashboard/:studentId", verifyToken, parentDashboard);

// export default router;

import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { parentDashboard } from "../controllers/parent.controller.js";

// ------------ Controllers ---------------
import {
  getMonthlyAttendance,
  getDailyAttendance,
  getAttendanceSummary
} from "../controllers/parent/attendance.controller.js";

import {
  getHomeworkList,
  getHomeworkDetails
} from "../controllers/parent/homework.controller.js";

import {
  getFeeDue,
  getFeeHistory,
  payFees
} from "../controllers/parent/fees.controller.js";

import { getTimetable } from "../controllers/parent/timetable.controller.js";
import { getExamSchedule } from "../controllers/parent/exam.controller.js";

import {
  applyLeave,
  getLeaveHistory
} from "../controllers/parent/leave.controller.js";

import {
  getMessages,
  sendMessageReply
} from "../controllers/parent/message.controller.js";
import { 
  getStudentExamResults 
} from "../controllers/parent/exam.controller.js";
import { getCirculars } from "../controllers/circular.controller.js";

const router = express.Router();

// -------------------- Dashboard --------------------
router.get("/dashboard/:studentId", verifyToken, parentDashboard);

// -------------------- Attendance --------------------
router.get("/attendance/monthly/:studentId", verifyToken, getMonthlyAttendance);
router.get("/attendance/daily/:studentId", verifyToken, getDailyAttendance);
router.get("/attendance/summary/:studentId", verifyToken, getAttendanceSummary);

// -------------------- Homework -----------------------
router.get("/homework/:studentId", verifyToken, getHomeworkList);
router.get("/homework/details/:id", verifyToken, getHomeworkDetails);

// -------------------- Fees ----------------------------
router.get("/fees/due/:studentId", verifyToken, getFeeDue);
router.get("/fees/history/:studentId", verifyToken, getFeeHistory);
router.post("/fees/pay/:studentId", verifyToken, payFees);
router.get("/circulars/:studentId", verifyToken, getCirculars);

// -------------------- Timetable ------------------------
router.get("/timetable/:studentId", verifyToken, getTimetable);

// -------------------- Exams ----------------------------
router.get("/exams/:studentId", verifyToken, getExamSchedule);

// -------------------- Leave Requests -------------------
router.post("/leave/apply/:studentId", verifyToken, applyLeave);
router.get("/leave/history/:studentId", verifyToken, getLeaveHistory);

// -------------------- Messages -------------------------
router.get("/messages/:studentId", verifyToken, getMessages);
router.post("/messages/reply/:studentId", verifyToken, sendMessageReply);

router.get("/exams/:studentId", verifyToken, getExamSchedule);
router.get("/exams/results/:studentId", verifyToken, getStudentExamResults);

export default router;
