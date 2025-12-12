import StudentRank from "../models/StudentRank.js";
import ExamMarks from "../models/ExamMarks.js";
import User from "../models/user.model.js";

/* ------------------------------------------------
   ADMIN → GENERATE RANKING
------------------------------------------------- */
export const generateRanking = async (req, res) => {
  try {
    const { classId, sectionId, examId } = req.body;

    // 1. Get students
    const students = await User.findAll({
      where: { classId, sectionId, accountType: "student" }
    });

    // 2. Calculate total marks
    const totals = [];

    for (const s of students) {
      const marks = await ExamMarks.findAll({
        where: { studentId: s.id, examId }
      });

      const total = marks.reduce(
        (sum, m) => sum + Number(m.marksObtained || 0),
        0
      );

      totals.push({ studentId: s.id, totalMarks: total });
    }

    // 3. Sort descending
    totals.sort((a, b) => b.totalMarks - a.totalMarks);

    // 4. Save ranks
    await StudentRank.destroy({ where: { classId, sectionId, examId } });

    for (let i = 0; i < totals.length; i++) {
      await StudentRank.create({
        studentId: totals[i].studentId,
        classId,
        sectionId,
        examId,
        totalMarks: totals[i].totalMarks,
        rank: i + 1,
        publishedBy: req.user.id
      });
    }

    res.json({ success: true, message: "Ranking generated" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/* ------------------------------------------------
   VIEW RANKING (Teacher / Student)
------------------------------------------------- */
export const getRanking = async (req, res) => {
  try {
    const { classId, sectionId, examId } = req.query;

    const ranks = await StudentRank.findAll({
      where: { classId, sectionId, examId },
      include: [{ model: User, attributes: ["full_name", "registrationNumber"] }],
      order: [["rank", "ASC"]]
    });

    res.json({ success: true, ranks });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
