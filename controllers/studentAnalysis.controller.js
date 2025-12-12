import StudentStrength from "../models/StudentStrength.js";
import StudentWeakness from "../models/StudentWeakness.js";
import SubjectTeacher from "../models/SubjectTeacher.js";


// -------------------- ADD STRENGTH --------------------
export const addStudentStrength = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { studentId, classId, sectionId, subjectId, title, remarks } = req.body;

    const allowed = await SubjectTeacher.findOne({
      where: { teacherId, classId, sectionId }
    });

    if (!allowed)
      return res.status(403).json({ success: false, message: "Not authorized" });

    const strength = await StudentStrength.create({
      teacherId,
      studentId,
      classId,
      sectionId,
      subjectId,
      title,
      remarks
    });

    res.json({ success: true, strength });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// -------------------- ADD WEAKNESS --------------------
export const addStudentWeakness = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { studentId, classId, sectionId, subjectId, issue, improvementNote } = req.body;

    const allowed = await SubjectTeacher.findOne({
      where: { teacherId, classId, sectionId }
    });

    if (!allowed)
      return res.status(403).json({ success: false, message: "Not authorized" });

    const weakness = await StudentWeakness.create({
      teacherId,
      studentId,
      classId,
      sectionId,
      subjectId,
      issue,
      improvementNote
    });

    res.json({ success: true, weakness });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// -------------------- VIEW ANALYSIS --------------------
export const getStudentAnalysis = async (req, res) => {
  try {
    const { studentId } = req.params;

    const strengths = await StudentStrength.findAll({ where: { studentId } });
    const weaknesses = await StudentWeakness.findAll({ where: { studentId } });

    res.json({
      success: true,
      strengths,
      weaknesses
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
