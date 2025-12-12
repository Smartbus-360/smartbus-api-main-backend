import ExtraCurricular from "../models/ExtraCurricular.js";
import SubjectTeacher from "../models/SubjectTeacher.js";

export const addExtraCurricular = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const {
      studentId,
      classId,
      sectionId,
      activityType,
      activityName,
      achievementLevel,
      remarks
    } = req.body;

    const allowed = await SubjectTeacher.findOne({
      where: { teacherId, classId, sectionId }
    });

    if (!allowed)
      return res.status(403).json({ success: false, message: "Not authorized" });

    const record = await ExtraCurricular.create({
      teacherId,
      studentId,
      classId,
      sectionId,
      activityType,
      activityName,
      achievementLevel,
      remarks,
      photo: req.files?.photo?.[0]?.path || null,
      certificate: req.files?.certificate?.[0]?.path || null
    });

    res.json({ success: true, record });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getStudentExtraCurricular = async (req, res) => {
  try {
    const { studentId } = req.params;

    const records = await ExtraCurricular.findAll({
      where: { studentId },
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, records });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
