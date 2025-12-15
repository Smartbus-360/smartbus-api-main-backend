import Exam from "../models/exam.js";
import ExamMarks from "../models/ExamMarks.js";

export const createExam = async (req, res) => {
  try {
    const { examName, classId, sectionId, date } = req.body;

    const exam = await Exam.create({
      examName,
      classId,
      sectionId,
      date
    });

    res.json({ success: true, exam });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const addMarks = async (req, res) => {
//   try {
//     const { examId, marks } = req.body;

//     /*
//       marks = [
//         { studentId: 1, subject: "Maths", marksObtained: 90, maxMarks: 100 }
//       ]
//     */

//     for (let m of marks) {
//       await ExamMarks.create({
//         examId,
//         studentId: m.studentId,
//         subject: m.subject,
//         marksObtained: m.marksObtained,
//         maxMarks: m.maxMarks
//       });
//     }

//     res.json({ success: true, message: "Marks added" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const addMarks = async (req, res) => {
  try {
    const { marks } = req.body;

    if (!Array.isArray(marks) || marks.length === 0) {
      return res.status(400).json({ message: "Marks array required" });
    }

    for (const m of marks) {

      // 1️⃣ Fetch exam details
      const exam = await Exam.findByPk(m.examId);
      if (!exam) {
        return res.status(404).json({ message: "Exam not found" });
      }

      // 2️⃣ Create marks using exam data
      await ExamMarks.create({
        examId: exam.id,
        studentId: m.studentId,
        subject: exam.subjectId,     // or exam.subject
        maxMarks: exam.totalMarks,   // comes from exam
        marksObtained: m.marksObtained
      });
    }

    res.json({ success: true, message: "Marks added successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    const results = await ExamMarks.findAll({
      where: { studentId },
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getExams = async (req, res) => {
  try {
    const { classId, sectionId } = req.query;

    const where = {};
    if (classId) where.classId = classId;
    if (sectionId) where.sectionId = sectionId;

    const exams = await Exam.findAll({ where });

    return res.json({ success: true, exams });

  } catch (error) {
    console.error("Get exams error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { examName, classId, sectionId, date } = req.body;

    const exam = await Exam.findByPk(id);

    if (!exam)
      return res.status(404).json({ success: false, message: "Exam not found" });

    exam.examName = examName || exam.examName;
    exam.classId = classId || exam.classId;
    exam.sectionId = sectionId || exam.sectionId;
    exam.date = date || exam.date;

    await exam.save();

    return res.json({ success: true, exam });

  } catch (error) {
    console.error("Update exam error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findByPk(id);
    if (!exam)
      return res.status(404).json({ success: false, message: "Exam not found" });

    await exam.destroy();

    return res.json({ success: true, message: "Exam deleted" });

  } catch (err) {
    console.error("Delete exam error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

