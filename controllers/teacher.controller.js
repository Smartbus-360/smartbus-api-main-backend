// import User from "../models/user.model.js";
// import SubjectTeacher from "../models/SubjectTeacher.js";
// // import TimeTable from "../models/TimeTable.js";
// import PeriodSlot from "../models/PeriodSlot.js";
// import Homework from "../models/Homework.js";
// import Exam from "../models/Exam.js";
// import Message from "../models/Message.js";
// import AttendanceStudent from "../models/Attendance_student.js";

// export const teacherDashboard = async (req, res) => {
//   try {
//     const teacherId = req.user.id;

//     // 1️⃣ Teacher info
//     const teacher = await User.findByPk(teacherId);
//     if (!teacher) return res.status(404).json({ message: "Teacher not found" });

//     // 2️⃣ Subject + Class Mapping
//     const assignedClasses = await SubjectTeacher.findAll({
//       where: { teacherId }
//     });

//     const classIds = assignedClasses.map(c => c.classId);
//     const sectionIds = assignedClasses.map(c => c.sectionId);

//     // 3️⃣ Today's Periods
//     const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
//     const today = days[new Date().getDay()];

//     const todaysPeriods = await PeriodSlot.findAll({
//       where: {
//         day: today,
//         classId: classIds,
//         sectionId: sectionIds,
//         teacherId
//       },
//       order: [["startTime", "ASC"]]
//     });

//     // 4️⃣ Total students taught
//     const students = await User.count({
//       where: {
//         classId: classIds,
//         sectionId: sectionIds,
//         role: "student"
//       }
//     });

//     // 5️⃣ Attendance Summary
//     const todayDate = new Date().toISOString().split("T")[0];

//     const attendance = await AttendanceStudent.findAll({
//       where: { date: todayDate, classId: classIds, sectionId: sectionIds }
//     });

// //     const present = attendance.filter(a => a.status === "P").length;
// // const absent = attendance.filter(a => a.status === "A").length;

// const present = attendance.filter(a => a.status === "P").length;
// const absent = attendance.filter(a => a.status === "A").length;
// const late = attendance.filter(a => a.status === "L").length;
// const excused = attendance.filter(a => a.status === "E").length;

//     // 6️⃣ Homework Due Today
//     const homeworkToday = await Homework.findAll({
//       where: {
//         dueDate: todayDate,
//         classId: classIds,
//         sectionId: sectionIds
//       }
//     });

//     // 7️⃣ Upcoming Exams
//     const upcomingExams = await Exam.findAll({
//       where: {
//         classId: classIds,
//         sectionId: sectionIds
//       },
//       limit: 3,
//       order: [["date", "ASC"]]
//     });

//     // 8️⃣ Unread Messages
//     const unreadMessages = await Message.count({
//       where: {
//         receiverId: teacherId,
//         seen: 0
//       }
//     });

//     res.json({
//       success: true,
//       teacher,
//       dashboard: {
//         todaysPeriods,
//         totalStudents: students,
//         attendanceSummary: { present, absent },
//         homeworkToday,
//         upcomingExams,
//         unreadMessages
//       }
//     });

//   } catch (error) {
//     console.error("Dashboard Error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const getAssignedClasses = async (req, res) => {
//   try {
//     const teacherId = req.user.id;

//     const assigned = await SubjectTeacher.findAll({
//       where: { teacherId },
//       attributes: ["classId", "sectionId"],
//       group: ["classId", "sectionId"]
//     });

//     res.json({ success: true, classes: assigned });

//   } catch (error) {
//     console.error("Assigned class error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const getStudentsForClass = async (req, res) => {
//   try {
//     const { classId, sectionId } = req.params;

//     const students = await User.findAll({
//       where: { classId, sectionId, accountType: "student" },
//       attributes: ["id", "full_name", "registrationNumber", "profilePicture"]
//     });

//     res.json({ success: true, students });

//   } catch (error) {
//     console.error("Get students error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const attendanceStatus = async (req, res) => {
//   try {
//     const { classId, sectionId, date } = req.query;

//     const record = await AttendanceStudent.findOne({
//       where: { classId, sectionId, date }
//     });

//     res.json({
//       success: true,
//       taken: !!record
//     });

//   } catch (error) {
//     console.error("Status error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// export const attendanceSummary = async (req, res) => {
//   try {
//     const teacherId = req.user.id;

//     const todayDate = new Date().toISOString().split("T")[0];

//     // Find classes taught by teacher
//     const assigned = await SubjectTeacher.findAll({ where: { teacherId } });

//     const classIds = assigned.map(a => a.classId);
//     const sectionIds = assigned.map(a => a.sectionId);

//     const attendance = await AttendanceStudent.findAll({
//       where: { classId: classIds, sectionId: sectionIds, date: todayDate }
//     });

//     // const present = attendance.filter(a => a.status === "Present").length;
//     // const absent = attendance.filter(a => a.status === "Absent").length;

//     const present = attendance.filter(a => a.status === "P").length;
// const absent = attendance.filter(a => a.status === "A").length;
// const late = attendance.filter(a => a.status === "L").length;
// const excused = attendance.filter(a => a.status === "E").length;

//     res.json({
//       success: true,
//       summary: { present, absent,late,excused }
//     });

//   } catch (error) {
//     console.error("Summary error:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
// import { Op } from "sequelize";

// export const getStudentsForAttendance = async (req, res) => {
//   try {
//     const { classId, sectionId } = req.params;

//     const students = await User.findAll({
//       where: { classId, sectionId, accountType: "student" },
//       attributes: ["id", "full_name", "registrationNumber", "profilePicture"]
//     });

//     return res.json({ success: true, students });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };
// export const markAttendance = async (req, res) => {
//   try {
//     const { classId, sectionId, date, records } = req.body;
//     const teacherId = req.user.id;

//     if (!records || !Array.isArray(records)) {
//       return res.status(400).json({ success: false, message: "Invalid records data" });
//     }

//     for (const r of records) {
//       await AttendanceStudent.create({
//         studentId: r.studentId,
//         classId,
//         sectionId,
//         date,
//         status: r.status,
//         markedBy: req.user.id
//       });
//     }

//     return res.json({ success: true, message: "Attendance marked" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };
// export const getAttendanceForDate = async (req, res) => {
//   try {
//     const { classId, sectionId, date } = req.query;

//     const students = await User.findAll({
//       where: { classId, sectionId, accountType: "student" },
//       attributes: ["id", "full_name"]
//     });

//     const attendance = await AttendanceStudent.findAll({
//       where: { classId, sectionId,date }
//     });

//     return res.json({ success: true, students, attendance });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };
// export const updateAttendance = async (req, res) => {
//   try {
//     // const { studentId, date, status } = req.body;
// const { studentId, classId, sectionId, date, status } = req.body;

//     const record = await AttendanceStudent.findOne({ where: { studentId, date } });

//     if (!record)
//       return res.status(404).json({ success: false, message: "Record not found" });

//     record.status = status;
//     await record.save();

//     return res.json({ success: true, message: "Attendance updated" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };
// export const monthlySummary = async (req, res) => {
//   try {
//     const { classId, sectionId, month, year } = req.query;

//     const students = await User.findAll({
//       where: { classId, sectionId, accountType: "student" },
//       attributes: ["id", "full_name"]
//     });

//     const summary = {};

//     for (const s of students) {
//       const records = await AttendanceStudent.findAll({
//         where: {
//           studentId: s.id,
//           date: {
//             [Op.between]: [`${year}-${month}-01`, `${year}-${month}-31`]
//           }
//         }
//       });

//       summary[s.full_name] = {
//         P: records.filter(r => r.status === "P").length,
//         A: records.filter(r => r.status === "A").length,
//         L: records.filter(r => r.status === "L").length,
//         E: records.filter(r => r.status === "E").length
//       };
//     }

//     return res.json({ success: true, summary });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };
// import Subject from "../models/Subject.js";

// export const getTeacherSubjects = async (req, res) => {
//   try {
//     const teacherId = req.user.id;

//     const subjects = await SubjectTeacher.findAll({
//       where: { teacherId },
//       include: [{ model: Subject }]
//     });

//     res.json({ success: true, subjects });

//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// // =========================
// // TEACHER LOGIN
// // =========================
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import sequelize from "../config/database.js";

// export const teacherLogin = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // FIND TEACHER USING accountType = 'staff'
//     const teacher = await sequelize.query(
//       "SELECT * FROM tbl_sm360_users WHERE email = :email AND accountType = 'staff' LIMIT 1",
//       {
//         replacements: { email },
//         type: sequelize.QueryTypes.SELECT,
//       }
//     );

//     if (!teacher.length) {
//       return res.status(404).json({ success: false, message: "Teacher not found" });
//     }

//     const teacherData = teacher[0];

//     // VERIFY PASSWORD
//     const isMatch = bcrypt.compareSync(password, teacherData.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: "Invalid password" });
//     }

//     // CREATE TOKEN
//     const token = jwt.sign(
//       { id: teacherData.id, accountType: teacherData.accountType },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       teacher: {
//         id: teacherData.id,
//         full_name: teacherData.full_name,
//         email: teacherData.email,
//         accountType: teacherData.accountType
//       }
//     });

//   } catch (err) {
//     next(err);
//   }
// };

// MODELS
import User from "../models/user.model.js";
import SubjectTeacher from "../models/SubjectTeacher.js";
import PeriodSlot from "../models/PeriodSlot.js";
import Homework from "../models/Homework.js";
import Exam from "../models/Exam.js";
import Message from "../models/Message.js";
import AttendanceStudent from "../models/Attendance_student.js";
import Subject from "../models/Subject.js";

// UTILS
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sequelize from "../config/database.js";


// =========================================
//            TEACHER DASHBOARD
// =========================================
export const teacherDashboard = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // 1️⃣ Teacher info
    const teacher = await User.findByPk(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // 2️⃣ Get assigned class-section-subject mapping
    const assignedClasses = await SubjectTeacher.findAll({
      where: { teacherId }
    });

    const classIds = assignedClasses.map(c => c.classId);
    const sectionIds = assignedClasses.map(c => c.sectionId);
    const subjectIds = assignedClasses.map(c => c.subjectId);

    // 3️⃣ Today's Periods
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = days[new Date().getDay()];

    const todaysPeriods = await PeriodSlot.findAll({
      where: {
        day: today,
        classId: classIds,
        sectionId: sectionIds,
        teacherId,
        subjectId: subjectIds
      },
      order: [["startTime", "ASC"]]
    });

    // 4️⃣ Total students taught
    const students = await User.count({
      where: {
        classId: classIds,
        sectionId: sectionIds,
        accountType: "student"
      }
    });

    // 5️⃣ Attendance Summary
    const todayDate = new Date().toISOString().split("T")[0];

    const attendance = await AttendanceStudent.findAll({
      where: {
        date: todayDate,
        classId: classIds,
        sectionId: sectionIds
      }
    });

    const present = attendance.filter(a => a.status === "P").length;
    const absent = attendance.filter(a => a.status === "A").length;
    const late = attendance.filter(a => a.status === "L").length;
    const excused = attendance.filter(a => a.status === "E").length;

    // 6️⃣ Homework Due Today
    const homeworkToday = await Homework.findAll({
      where: {
        dueDate: todayDate,
        classId: classIds,
        sectionId: sectionIds
      }
    });

    // 7️⃣ Upcoming Exams
    const upcomingExams = await Exam.findAll({
      where: {
        classId: classIds,
        sectionId: sectionIds
      },
      limit: 3,
      order: [["date", "ASC"]]
    });

    // 8️⃣ Unread Messages
    const unreadMessages = await Message.count({
      where: { receiverId: teacherId, seen: 0 }
    });

    return res.json({
      success: true,
      teacher,
      dashboard: {
        todaysPeriods,
        totalStudents: students,
        attendanceSummary: { present, absent, late, excused },
        homeworkToday,
        upcomingExams,
        unreadMessages
      }
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


// =========================================
//      GET ASSIGNED CLASSES FOR TEACHER
// =========================================
export const getAssignedClasses = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const assigned = await SubjectTeacher.findAll({
      where: { teacherId },
      attributes: ["classId", "sectionId"],
      group: ["classId", "sectionId"]
    });

    return res.json({ success: true, classes: assigned });

  } catch (error) {
    console.error("Assigned class error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


// =========================================
//            GET STUDENTS FOR CLASS
// =========================================
export const getStudentsForClass = async (req, res) => {
  try {
    const { classId, sectionId } = req.params;

    const students = await User.findAll({
      where: { classId, sectionId, accountType: "student" },
      attributes: ["id", "full_name", "registrationNumber", "profilePicture"]
    });

    return res.json({ success: true, students });

  } catch (error) {
    console.error("Get students error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


// =========================================
//         CHECK IF ATTENDANCE DONE
// =========================================
export const attendanceStatus = async (req, res) => {
  try {
    const { classId, sectionId, date } = req.query;

    const record = await AttendanceStudent.findOne({
      where: { classId, sectionId, date }
    });

    return res.json({ success: true, taken: !!record });

  } catch (error) {
    console.error("Status error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


// =========================================
//        DAILY ATTENDANCE SUMMARY
// =========================================
export const attendanceSummary = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const todayDate = new Date().toISOString().split("T")[0];

    const assigned = await SubjectTeacher.findAll({ where: { teacherId } });
    const classIds = assigned.map(a => a.classId);
    const sectionIds = assigned.map(a => a.sectionId);

    const attendance = await AttendanceStudent.findAll({
      where: { classId: classIds, sectionId: sectionIds, date: todayDate }
    });

    const present = attendance.filter(a => a.status === "P").length;
    const absent = attendance.filter(a => a.status === "A").length;
    const late = attendance.filter(a => a.status === "L").length;
    const excused = attendance.filter(a => a.status === "E").length;

    return res.json({
      success: true,
      summary: { present, absent, late, excused }
    });

  } catch (error) {
    console.error("Summary error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


// =========================================
//        GET STUDENTS FOR ATTENDANCE
// =========================================
export const getStudentsForAttendance = async (req, res) => {
  try {
    const { classId, sectionId } = req.params;

    const students = await User.findAll({
      where: { classId, sectionId, accountType: "student" },
      attributes: ["id", "full_name", "registrationNumber", "profilePicture"]
    });

    return res.json({ success: true, students });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// =========================================
//             MARK ATTENDANCE
// =========================================
export const markAttendance = async (req, res) => {
  try {
    const { classId, sectionId, date, records } = req.body;

    if (!records || !Array.isArray(records)) {
      return res.status(400).json({ success: false, message: "Invalid records data" });
    }

    for (const r of records) {
      await AttendanceStudent.create({
        studentId: r.studentId,
        classId,
        sectionId,
        date,
        status: r.status,
        markedBy: req.user.id
      });
    }

    return res.json({ success: true, message: "Attendance marked" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// =========================================
//        GET ATTENDANCE FOR A DATE
// =========================================
export const getAttendanceForDate = async (req, res) => {
  try {
    const { classId, sectionId, date } = req.query;

    const students = await User.findAll({
      where: { classId, sectionId, accountType: "student" },
      attributes: ["id", "full_name", "registrationNumber", "profilePicture"]
    });

    const attendance = await AttendanceStudent.findAll({
      where: { classId, sectionId, date }
    });

    return res.json({ success: true, students, attendance });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// =========================================
//            UPDATE ATTENDANCE
// =========================================
export const updateAttendance = async (req, res) => {
  try {
    const { studentId, classId, sectionId, date, status } = req.body;

    const record = await AttendanceStudent.findOne({
      where: { studentId, classId, sectionId, date }
    });

    if (!record)
      return res.status(404).json({ success: false, message: "Record not found" });

    record.status = status;
    await record.save();

    return res.json({ success: true, message: "Attendance updated" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// =========================================
//            MONTHLY SUMMARY
// =========================================
export const monthlySummary = async (req, res) => {
  try {
    const { classId, sectionId, month, year } = req.query;

    const students = await User.findAll({
      where: { classId, sectionId, accountType: "student" },
      attributes: ["id", "full_name"]
    });

    const summary = {};

    for (const s of students) {
      const records = await AttendanceStudent.findAll({
        where: {
          studentId: s.id,
          classId,
          sectionId,
          date: {
            [Op.between]: [`${year}-${month}-01`, `${year}-${month}-31`]
          }
        }
      });

      summary[s.full_name] = {
        P: records.filter(r => r.status === "P").length,
        A: records.filter(r => r.status === "A").length,
        L: records.filter(r => r.status === "L").length,
        E: records.filter(r => r.status === "E").length
      };
    }

    return res.json({ success: true, summary });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


// =========================================
//        TEACHER SUBJECT LIST
// =========================================
export const getTeacherSubjects = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const subjects = await SubjectTeacher.findAll({
      where: { teacherId },
      include: [{ model: Subject }]
    });

    return res.json({ success: true, subjects });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


// =========================================
//             TEACHER LOGIN
// =========================================
export const teacherLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // FIND TEACHER USING accountType = 'staff'
    const teacher = await sequelize.query(
      "SELECT * FROM tbl_sm360_users WHERE email = :email AND accountType = 'staff' LIMIT 1",
      {
        replacements: { email },
        type: sequelize.QueryTypes.SELECT
      }
    );

    if (!teacher.length)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    const teacherData = teacher[0];

    // VERIFY PASSWORD
    const isMatch = bcrypt.compareSync(password, teacherData.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid password" });

    // CREATE TOKEN
    const token = jwt.sign(
      { id: teacherData.id, accountType: teacherData.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      teacher: {
        id: teacherData.id,
        full_name: teacherData.full_name,
        email: teacherData.email,
        accountType: teacherData.accountType
      }
    });

  } catch (err) {
    next(err);
  }
};
