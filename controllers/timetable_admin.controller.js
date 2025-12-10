import PeriodSlot from "../models/PeriodSlot.js";
import SubjectTeacher from "../models/SubjectTeacher.js";
import Subject from "../models/Subject.js";
import User from "../models/user.model.js";
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";

/* ========================================================
   ADMIN — CREATE A PERIOD SLOT
======================================================== */
// export const createPeriod = async (req, res) => {
//   try {
//     const instituteId = req.user.instituteId;

//     const {
//       classId,
//       sectionId,
//       subjectId,
//       teacherId,
//       day,
//       startTime,
//       endTime
//     } = req.body;

//     if (!classId || !sectionId || !subjectId || !teacherId || !day || !startTime || !endTime) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     // Check teacher belongs to same institute
//     const teacher = await User.findOne({
//       where: { id: teacherId, instituteId, accountType: "staff" }
//     });

//     if (!teacher) {
//       return res.status(400).json({ success: false, message: "Invalid teacher for this institute" });
//     }

//     // Validate teacher subject mapping
//     const mapping = await SubjectTeacher.findOne({
//       where: { teacherId, subjectId, classId, sectionId }
//     });

//     if (!mapping) {
//       return res.status(400).json({
//         success: false,
//         message: "Teacher not mapped to this subject/class/section"
//       });
//     }

//     const period = await PeriodSlot.create({
//       classId,
//       sectionId,
//       subjectId,
//       teacherId,
//       day,
//       startTime,
//       endTime
//     });

//     return res.json({ success: true, period });

//   } catch (err) {
//     console.error("Create period error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };


export const createPeriod = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const {
      classId,
      sectionId,
      subjectId,
      teacherId,
      day,
      startTime,
      endTime
    } = req.body;

    if (!classId || !sectionId || !subjectId || !teacherId || !day || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    /** 1) Validate teacher belongs to same institute */
    const teacher = await User.findOne({
      where: { id: teacherId, instituteId, accountType: "staff" }
    });

    if (!teacher) {
      return res.status(400).json({ success: false, message: "Invalid teacher for this institute" });
    }

    /** 2) Validate teacher-subject mapping */
    const mapping = await SubjectTeacher.findOne({
      where: { teacherId, subjectId, classId, sectionId }
    });

    if (!mapping) {
      return res.status(400).json({
        success: false,
        message: "Teacher not mapped to this subject/class/section"
      });
    }

    /** 3) Prevent time clash */
    const clash = await PeriodSlot.findOne({
      where: {
        teacherId,
        day,
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime }
      }
    });

    if (clash) {
      return res.status(409).json({
        success: false,
        message: "Time conflict: Teacher already has a period in this time range"
      });
    }

    const period = await PeriodSlot.create({
      classId,
      sectionId,
      subjectId,
      teacherId,
      day,
      startTime,
      endTime
    });

    return res.json({ success: true, period });

  } catch (err) {
    console.error("Create period error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ========================================================
   ADMIN — GET TIMETABLE FOR A CLASS + SECTION
======================================================== */
export const getClassTimetable = async (req, res) => {
  try {
    const { classId, sectionId } = req.params;

    const periods = await PeriodSlot.findAll({
      where: { classId, sectionId },
      include: [
        { model: Subject },
        { model: User, attributes: ["id", "full_name"] }
      ],
      order: [["day", "ASC"], ["startTime", "ASC"]]
    });

    return res.json({ success: true, periods });

  } catch (err) {
    console.error("Get class timetable error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


/* ========================================================
   ADMIN — UPDATE A PERIOD
======================================================== */
// export const updatePeriod = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const period = await PeriodSlot.findByPk(id);
//     if (!period) return res.status(404).json({ success: false, message: "Period not found" });

//     await period.update(req.body);

//     return res.json({ success: true, message: "Period updated" });

//   } catch (err) {
//     console.error("Update period error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const updatePeriod = async (req, res) => {
  try {
    const { id } = req.params;

    const period = await PeriodSlot.findByPk(id);
    if (!period)
      return res.status(404).json({ success: false, message: "Period not found" });

    const {
      classId = period.classId,
      sectionId = period.sectionId,
      subjectId = period.subjectId,
      teacherId = period.teacherId,
      day = period.day,
      startTime = period.startTime,
      endTime = period.endTime
    } = req.body;

    /** Clash check (exclude current period) */
    const clash = await PeriodSlot.findOne({
      where: {
        teacherId,
        day,
        id: { [Op.ne]: id },
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime }
      }
    });

    if (clash) {
      return res.status(409).json({
        success: false,
        message: "Updated time conflicts with another assigned period"
      });
    }

    await period.update({ classId, sectionId, subjectId, teacherId, day, startTime, endTime });

    return res.json({ success: true, message: "Period updated" });

  } catch (err) {
    console.error("Update period error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



/* ========================================================
   ADMIN — DELETE A PERIOD
======================================================== */
export const deletePeriod = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PeriodSlot.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ success: false, message: "Period not found" });

    return res.json({ success: true, message: "Period deleted" });

  } catch (err) {
    console.error("Delete period error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const exportTimetablePDF = async (req, res) => {
  try {
    const { classId, sectionId } = req.params;

    const periods = await PeriodSlot.findAll({
      where: { classId, sectionId },
      include: [
        { model: Subject },
        { model: User, attributes: ["full_name"] }
      ],
      order: [["day", "ASC"], ["startTime", "ASC"]]
    });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=timetable.pdf");

    doc.pipe(res);

    doc.fontSize(20).text(`Timetable for Class ${classId}-${sectionId}`, { align: "center" });
    doc.moveDown();

    periods.forEach(p => {
      doc.fontSize(12).text(
        `${p.day} | ${p.startTime} - ${p.endTime} | ${p.subject.name} | ${p.user.full_name}`
      );
    });

    doc.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to export PDF" });
  }
};
export const exportTimetableExcel = async (req, res) => {
  try {
    const { classId, sectionId } = req.params;

    const periods = await PeriodSlot.findAll({
      where: { classId, sectionId },
      include: [
        { model: Subject },
        { model: User, attributes: ["full_name"] }
      ],
      order: [["day", "ASC"], ["startTime", "ASC"]]
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Timetable");

    sheet.columns = [
      { header: "Day", key: "day" },
      { header: "Start Time", key: "startTime" },
      { header: "End Time", key: "endTime" },
      { header: "Subject", key: "subject" },
      { header: "Teacher", key: "teacher" }
    ];

    periods.forEach(p => {
      sheet.addRow({
        day: p.day,
        startTime: p.startTime,
        endTime: p.endTime,
        subject: p.subject.name,
        teacher: p.user.full_name
      });
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=timetable.xlsx");

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to export Excel" });
  }
};
export const getStudentTimetable = async (req, res) => {
  try {
    const { classId, sectionId } = req.user; // student details decoded from token

    const periods = await PeriodSlot.findAll({
      where: { classId, sectionId },
      include: [
        { model: Subject },
        { model: User, attributes: ["full_name"] }
      ],
      order: [["day", "ASC"], ["startTime", "ASC"]]
    });

    return res.json({ success: true, periods });

  } catch (err) {
    console.error("Student timetable error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
