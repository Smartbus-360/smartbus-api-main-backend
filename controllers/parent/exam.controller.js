import Exam from "../../models/exam.js";
import ExamMarks from "../../models/ExamMarks.js";
import User from "../../models/user.model.js";

// ---------------------------------------------------------
// GET EXAM SCHEDULE FOR A STUDENT
// ---------------------------------------------------------
export const getExamSchedule = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1. Fetch student's class + section
    const student = await User.findOne({ where: { id: studentId } });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const { classId, sectionId } = student;

    if (!classId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Student classId or sectionId missing in user record"
      });
    }

    // 2. Fetch exam schedule for class + section
    const exams = await Exam.findAll({
      where: { classId, sectionId },
      order: [["date", "ASC"], ["createdAt", "DESC"]]
    });

    return res.json({
      success: true,
      schedule: exams
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------------------------------------------
// GET STUDENT EXAM MARKS / RESULTS
// ---------------------------------------------------------
export const getStudentExamResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    const results = await ExamMarks.findAll({
      where: { studentId },
      order: [
        ["examId", "ASC"],
        ["subject", "ASC"]
      ]
    });

    return res.json({
      success: true,
      results
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
