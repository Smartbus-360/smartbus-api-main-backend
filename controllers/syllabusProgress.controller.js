import SyllabusProgress from "../models/SyllabusProgress.js";
import SubjectTeacher from "../models/SubjectTeacher.js";

export const addSyllabusProgress = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { classId, sectionId, subjectId, chapterName, status, remarks } = req.body;

    // Authorization check
    const allowed = await SubjectTeacher.findOne({
      where: { teacherId, classId, sectionId, subjectId }
    });

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Not authorized for this subject"
      });
    }

    const progress = await SyllabusProgress.create({
      teacherId,
      classId,
      sectionId,
      subjectId,
      chapterName,
      status,
      coveredDate: status === "completed" ? new Date() : null,
      remarks
    });

    res.json({ success: true, progress });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSyllabusProgress = async (req, res) => {
  try {
    const { classId, sectionId, subjectId } = req.query;

    const progress = await SyllabusProgress.findAll({
      where: { classId, sectionId, subjectId },
      order: [["createdAt", "ASC"]]
    });

    res.json({ success: true, progress });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
