import Homework from "../../models/Homework.js";
import User from "../../models/user.model.js";  // to get class & section
import { Op } from "sequelize";

// ----------------------------------------
// GET HOMEWORK LIST FOR A STUDENT
// ----------------------------------------
export const getHomeworkList = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1. Get student class + section
    const student = await User.findOne({
      where: { id: studentId }
    });

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

    // 2. Fetch homework for class + section
    const homework = await Homework.findAll({
      where: { classId, sectionId },
      order: [
        ["priority", "DESC"], // high → medium → low
        ["dueDate", "ASC"],
        ["createdAt", "DESC"]
      ]
    });

    return res.json({
      success: true,
      homework
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ----------------------------------------
// GET HOMEWORK DETAILS
// ----------------------------------------
export const getHomeworkDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const homework = await Homework.findOne({
      where: { id }
    });

    if (!homework) {
      return res.status(404).json({
        success: false,
        message: "Homework not found"
      });
    }

    return res.json({
      success: true,
      homework
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
