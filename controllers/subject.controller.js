import Subject from "../models/Subject.js";
import SubjectTeacher from "../models/SubjectTeacher.js";
import User from "../models/user.model.js";

// ===============================
// CREATE SUBJECT
// ===============================
export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const instituteId = req.user.instituteId; // Admin’s institute

    if (!name) {
      return res.status(400).json({ success: false, message: "Subject name is required" });
    }

    // Check duplicate
    const exists = await Subject.findOne({ where: { name, instituteId } });
    if (exists) {
      return res.status(400).json({ success: false, message: "Subject already exists" });
    }

    const subject = await Subject.create({ name, instituteId });

    return res.json({ success: true, subject });
  } catch (err) {
    console.error("Create subject error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===============================
// GET ALL SUBJECTS (ADMIN)
// ===============================
export const getSubjects = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const subjects = await Subject.findAll({
      where: { instituteId },
      order: [["name", "ASC"]]
    });

    return res.json({ success: true, subjects });
  } catch (err) {
    console.error("Get subjects error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===============================
// UPDATE SUBJECT
// ===============================
export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const instituteId = req.user.instituteId;

    const subject = await Subject.findOne({ where: { id, instituteId } });

    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    subject.name = name;
    await subject.save();

    return res.json({ success: true, message: "Subject updated" });
  } catch (err) {
    console.error("Update subject error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===============================
// DELETE SUBJECT
// ===============================
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const instituteId = req.user.instituteId;

    const subject = await Subject.findOne({ where: { id, instituteId } });

    if (!subject) {
      return res.status(404).json({ success: false, message: "Subject not found" });
    }

    await subject.destroy();
    return res.json({ success: true, message: "Subject deleted" });
  } catch (err) {
    console.error("Delete subject error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =========================================================
// ASSIGN SUBJECT TO TEACHER + CLASS + SECTION
// =========================================================
export const assignSubjectToTeacher = async (req, res) => {
  try {
    const { subjectId, teacherId, classId, sectionId } = req.body;
    const instituteId = req.user.instituteId;

    // Validate teacher belongs to same institute
    const teacher = await User.findOne({
      where: { id: teacherId, instituteId, accountType: "staff" }
    });

    if (!teacher) {
      return res.status(400).json({ success: false, message: "Invalid teacher" });
    }

    // Check duplicate mapping
    const exists = await SubjectTeacher.findOne({
      where: { subjectId, teacherId, classId, sectionId }
    });

    if (exists) {
      return res.status(400).json({ success: false, message: "This mapping already exists" });
    }

    // Create mapping
    await SubjectTeacher.create({
      subjectId,
      teacherId,
      classId,
      sectionId
    });

    return res.json({ success: true, message: "Assigned successfully" });
  } catch (err) {
    console.error("Assign subject error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =========================================================
// GET SUBJECTS FOR A CLASS + SECTION
// =========================================================
export const getClassSubjects = async (req, res) => {
  try {
    const { classId, sectionId } = req.params;

    const subjects = await SubjectTeacher.findAll({
      where: { classId, sectionId },
      include: [{ model: Subject }]
    });

    return res.json({ success: true, subjects });
  } catch (err) {
    console.error("Get class subjects error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// =========================================================
// GET SUBJECTS ASSIGNED TO A TEACHER
// =========================================================
export const getTeacherSubjects = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const subjects = await SubjectTeacher.findAll({
      where: { teacherId },
      include: [{ model: Subject }]
    });

    return res.json({ success: true, subjects });
  } catch (err) {
    console.error("Get teacher subjects error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
