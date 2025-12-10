import Attendance from "../models/Attendance_student.js";

export const markAttendance = async (req, res) => {
  try {
    const { students } = req.body;

    /*
      students = [
        { studentId: 1, status: "P" },
        { studentId: 2, status: "A" }
      ]
    */

    for (let s of students) {
      await Attendance.create({
        studentId: s.studentId,
        status: s.status,
        date: new Date(),
        markedBy: req.user.id
      });
    }

    res.json({ success: true, message: "Attendance Submitted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const records = await Attendance.findAll({
      where: { studentId },
      order: [["date", "DESC"]]
    });

    res.json({ success: true, attendance: records });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
