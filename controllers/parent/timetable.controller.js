import TimeTable from "../../models/TimeTable.js";
import User from "../../models/user.model.js";

// ---------------------------------------------------------
// GET TIMETABLE FOR A STUDENT (ENTIRE WEEK)
// ---------------------------------------------------------
export const getTimetable = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1. Fetch student class + section
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

    // 2. Fetch all timetable entries for student's class/section
    const periods = await TimeTable.findAll({
      where: { classId, sectionId },
      order: [
        ["day", "ASC"],
        ["periodNumber", "ASC"]
      ]
    });

    // 3. Group by days
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const grouped = {};

    weekDays.forEach((d) => {
      grouped[d] = periods.filter((p) => p.day === d);
    });

    return res.json({
      success: true,
      timetable: grouped
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
