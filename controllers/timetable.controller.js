// import SubjectTeacher from "../models/SubjectTeacher.js";
// import Subject from "../models/Subject.js";
// import PeriodSlot from "../models/PeriodSlot.js";

// export const getTeacherClasses = async (req, res) => {
//   try {
//     const { teacherId } = req.params;

//     const classes = await SubjectTeacher.findAll({
//       where: { teacherId },
//       include: [
//         { model: Subject, attributes: ["id", "name"] }
//       ]
//     });

//     res.json({ success: true, classes });

//   } catch (error) {
//     console.error("Teacher classes error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// export const getTeacherTimetable = async (req, res) => {
//   try {
//     const { teacherId } = req.params;

//     const periods = await PeriodSlot.findAll({
//       where: { teacherId },
//       order: [
//         ["day", "ASC"],
//         ["startTime", "ASC"]
//       ]
//     });

//     // Prepare clean structure
//     const timetable = {
//       Mon: [],
//       Tue: [],
//       Wed: [],
//       Thu: [],
//       Fri: [],
//       Sat: []
//     };

//     periods.forEach(p => {
//       const slot = {
//         subjectId: p.subjectId,
//         classId: p.classId,
//         sectionId: p.sectionId,
//         startTime: p.startTime,
//         endTime: p.endTime
//       };

//       if (timetable[p.day]) {
//         timetable[p.day].push(slot);
//       }
//     });

//     res.json({ success: true, timetable });

//   } catch (error) {
//     console.error("Get teacher timetable error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


import SubjectTeacher from "../models/SubjectTeacher.js";
import Subject from "../models/Subject.js";
import PeriodSlot from "../models/PeriodSlot.js";

/* -------------------------------------------------------
   1. GET TEACHER CLASSES
--------------------------------------------------------*/
export const getTeacherClasses = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const classes = await SubjectTeacher.findAll({
      where: { teacherId },
      include: [{ model: Subject, attributes: ["id", "name"] }]
    });

    res.json({ success: true, classes });
  } catch (error) {
    console.error("Teacher classes error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* -------------------------------------------------------
   2. GET TEACHER TIMETABLE (WITHOUT DAY COLUMN)
--------------------------------------------------------*/
// export const getTeacherTimetable = async (req, res) => {
//   try {
//     const { teacherId } = req.params;

//     // Fetch all period slots for this teacher
//     const periods = await PeriodSlot.findAll({
//       where: { teacherId },
//       order: [["periodNumber", "ASC"]]   // No "day" in DB
//     });

//     // Group by CLASS + SECTION
//     const timetable = {};

//     periods.forEach(p => {
//       const key = `Class-${p.classId}-Section-${p.sectionId}`;

//       if (!timetable[key]) timetable[key] = [];

//       timetable[key].push({
//         periodNumber: p.periodNumber,
//         subjectId: p.subjectId,
//         startTime: p.startTime,
//         endTime: p.endTime
//       });
//     });

//     res.json({ success: true, timetable });

//   } catch (error) {
//     console.error("Get teacher timetable error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const getTeacherTimetable = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const periods = await PeriodSlot.findAll({
      where: { teacherId },
      order: [
        ["day", "ASC"],
        ["startTime", "ASC"]
      ]
    });

    const timetable = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: []
    };

    periods.forEach(p => {
      const slot = {
        subjectId: p.subjectId,
        classId: p.classId,
        sectionId: p.sectionId,
        startTime: p.startTime,
        endTime: p.endTime,
        periodNumber: p.periodNumber
      };

      if (timetable[p.day]) timetable[p.day].push(slot);
    });

    return res.json({ success: true, timetable });

  } catch (error) {
    console.error("Get teacher timetable error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
