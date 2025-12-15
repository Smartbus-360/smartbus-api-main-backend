import Attendance from "../../models/Attendance_student.js";
import { Op } from "sequelize";

// ------------------------- MONTHLY ATTENDANCE -------------------------
export const getMonthlyAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ 
        success: false, 
        message: "month and year are required (e.g., ?month=1&year=2025)" 
      });
    }

    // const startDate = new Date(year, month - 1, 1);
    // const endDate   = new Date(year, month, 0); // last day of month

    // const attendance = await Attendance.findAll({
    //   where: {
    //     studentId,
    //     date: { [Op.between]: [startDate, endDate] }
    //   },
    //   order: [["date", "ASC"]]
    // });
    const monthStr = month.toString().padStart(2, "0");
const datePrefix = `${year}-${monthStr}`;

const attendance = await Attendance.findAll({
  where: {
    studentId,
    date: {
      [Op.like]: `${datePrefix}%`
    }
  },
  order: [["date", "ASC"]]
});


    return res.json({ success: true, attendance });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------- DAILY ATTENDANCE -------------------------
export const getDailyAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ success: false, message: "date (YYYY-MM-DD) required" });
    }

    const record = await Attendance.findOne({
      where: { studentId, date },
    });

    return res.json({
      success: true,
      attendance: record || { status: "N/A", date }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ------------------------- SUMMARY (P/A/L/E) -------------------------
// export const getAttendanceSummary = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const { month, year } = req.query;

//     if (!month || !year) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "month and year are required" 
//       });
//     }

//     const startDate = new Date(year, month - 1, 1);
//     const endDate   = new Date(year, month, 0);

//     const records = await Attendance.findAll({
//       where: {
//         studentId,
//         date: { [Op.between]: [startDate, endDate] }
//       }
//     });

//     let summary = { P: 0, A: 0, L: 0, E: 0 };

//     records.forEach(r => {
//       summary[r.status] = (summary[r.status] || 0) + 1;
//     });

//     res.json({ success: true, summary });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

export const getAttendanceSummary = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "month and year are required"
      });
    }

    // 🔥 FIX: build YYYY-MM
    const monthStr = month.toString().padStart(2, "0");
    const datePrefix = `${year}-${monthStr}`;

    const records = await Attendance.findAll({
      where: {
        studentId,
        date: {
          [Op.like]: `${datePrefix}%`
        }
      }
    });

    let summary = { P: 0, A: 0, L: 0, E: 0 };

    records.forEach(r => {
      summary[r.status] = (summary[r.status] || 0) + 1;
    });

    return res.json({ success: true, summary });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
