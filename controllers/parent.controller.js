import User from "../models/user.model.js";   // ✅ Correct Student/User Model
import Homework from "../models/Homework.js";
import TimeTable from "../models/TimeTable.js";
import Attendance from "../models/Attendance_student.js";
import Exam from "../models/Exam.js";
import ExamMarks from "../models/ExamMarks.js";

export const parentDashboard = async (req, res) => {
  try {
    const { studentId } = req.params;

    // ✅ Correct student model
    const student = await User.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // 🔥 Homework (latest 5)
    const homework = await Homework.findAll({
      where: { classId: student.classId, sectionId: student.sectionId },
      limit: 5,
      order: [["createdAt", "DESC"]]
    });

    // 🔥 Today's timetable
    const timetable = await TimeTable.findAll({
      where: {
        classId: student.classId,
        sectionId: student.sectionId,
        day: getDay()
      },
      order: [["periodNumber", "ASC"]]
    });

    // 🔥 Last 30 attendance records
    const attendance = await Attendance.findAll({
      where: { studentId },
      limit: 30,
      order: [["date", "DESC"]]
    });

    // 🔥 Upcoming exam
    const exam = await Exam.findOne({
      where: {
        classId: student.classId,
        sectionId: student.sectionId
      },
      order: [["date", "ASC"]]
    });

    // 🔥 Latest marks
    const marks = await ExamMarks.findAll({
      where: { studentId },
      limit: 20,
      order: [["createdAt", "DESC"]]
    });

    return res.json({
      success: true,
      student,
      homework,
      timetable,
      attendance,
      exam,
      marks
    });

  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: err.message });
  }
};

function getDay() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date().getDay()];
}
