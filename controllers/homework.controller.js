import Homework from "../models/Homework.js";
import SubjectTeacher from "../models/SubjectTeacher.js";

/* =====================================================
   CREATE HOMEWORK  (ONLY TEACHER CAN CREATE)
====================================================== */
export const createHomework = async (req, res) => {
  try {
    const teacherId = req.user.id; // teacher from JWT

    const {
      classId,
      sectionId,
      subjectId,
      title,
      description,
      dueDate ,
      priority = "low"    // Use correct field name
    } = req.body;

    if (!classId || !sectionId || !subjectId || !title || !dueDate) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate teacher is assigned to teach this subject/class/section
    const allowed = await SubjectTeacher.findOne({
      where: { teacherId, classId, sectionId, subjectId }
    });

    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to assign homework for this class/section"
      });
    }

    const homework = await Homework.create({
      teacherId,
      classId,
      sectionId,
      subjectId,
      subject: subjectId,
      title,
      description,
      dueDate,
      createdBy: teacherId
    });

    res.json({ success: true, homework });

  } catch (error) {
    console.error("Create homework error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/* =====================================================
   GET HOMEWORK CREATED BY TEACHER
====================================================== */
export const getTeacherHomework = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const homework = await Homework.findAll({
      where: { createdBy: req.user.id },
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, homework });

  } catch (error) {
    console.error("Get teacher homework error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/* =====================================================
   UPDATE HOMEWORK (ONLY AUTHOR TEACHER CAN UPDATE)
====================================================== */
export const updateHomework = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { id } = req.params;

    const homework = await Homework.findOne({ where: { id, teacherId } });

    if (!homework) {
      return res.status(404).json({ success: false, message: "Homework not found or not yours" });
    }

    await homework.update(req.body);

    res.json({ success: true, message: "Homework updated" });

  } catch (error) {
    console.error("Update homework error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/* =====================================================
   DELETE HOMEWORK (ONLY AUTHOR TEACHER CAN DELETE)
====================================================== */
export const deleteHomework = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { id } = req.params;

    const homework = await Homework.findOne({ where: { id, teacherId } });

    if (!homework) {
      return res.status(404).json({ success: false, message: "Homework not found or not yours" });
    }

    await homework.destroy();

    res.json({ success: true, message: "Homework deleted" });

  } catch (error) {
    console.error("Delete homework error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
