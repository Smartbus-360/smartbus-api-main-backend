// import Student from "../models/user.model.js";
// import Teacher from "../models/teacher.model.js";
// import Parent from "../models/parent.model.js";
// import Attendance from "../models/attendance.model.js";
// import Homework from "../models/homework.model.js";
// import Exam from "../models/exam.model.js";
// import Notification from "../models/notification.model.js";
// import { Op } from "sequelize";

// // 🔹 TOTAL COUNTERS
// export const getTotalCounts = async (req, res) => {
//   try {
//     const totalStudents = await Student.count();
//     const totalTeachers = await Teacher.count();
//     const totalParents = await Parent.count();

//     res.json({
//       success: true,
//       totalStudents,
//       totalTeachers,
//       totalParents
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// export const getAttendanceSummary = async (req, res) => {
//   try {
//     const today = new Date().toISOString().slice(0, 10);

//     const totalStudents = await Student.count();
//     const presentToday = await Attendance.count({ where: { date: today } });

//     const percentage = totalStudents > 0 ? 
//       ((presentToday / totalStudents) * 100).toFixed(2) : 0;

//     res.json({
//       success: true,
//       presentToday,
//       totalStudents,
//       percentage
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// export const getHomeworkSummary = async (req, res) => {
//   try {
//     const last7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

//     const homeworkCount = await Homework.count({
//       where: { createdAt: { [Op.gte]: last7 } }
//     });

//     res.json({
//       success: true,
//       last7DaysHomework: homeworkCount
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// export const getExamSummary = async (req, res) => {
//   try {
//     const today = new Date().toISOString().slice(0, 10);

//     const upcoming = await Exam.count({
//       where: { examDate: { [Op.gt]: today } }
//     });

//     const completed = await Exam.count({
//       where: { examDate: { [Op.lt]: today } }
//     });

//     res.json({
//       success: true,
//       upcomingExams: upcoming,
//       completedExams: completed
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// export const getNotificationSummary = async (req, res) => {
//   try {
//     const totalNotifications = await Notification.count();

//     const last24 = new Date(Date.now() - 24 * 60 * 60 * 1000);

//     const todayNotifications = await Notification.count({
//       where: { createdAt: { [Op.gte]: last24 } }
//     });

//     res.json({
//       success: true,
//       totalNotifications,
//       todayNotifications
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// export const getAttendanceGraph = async (req, res) => {
//   try {
//     const graphData = [];

//     for (let i = 6; i >= 0; i--) {
//       const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
//         .toISOString().slice(0, 10);

//       const count = await Attendance.count({ where: { date } });

//       graphData.push({ date, present: count });
//     }

//     res.json({ success: true, graphData });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// export const getHomeworkGraph = async (req, res) => {
//   try {
//     const graphData = [];

//     for (let i = 29; i >= 0; i--) {
//       const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);

//       const count = await Homework.count({
//         where: { createdAt: { [Op.gte]: date.setHours(0,0,0), [Op.lt]: date.setHours(23,59,59) }}
//       });

//       graphData.push({
//         date: new Date(date).toISOString().slice(0,10),
//         homework: count
//       });
//     }

//     res.json({ success: true, graphData });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
