import Subject from "../models/Subject.js";
import SubjectTeacher from "../models/SubjectTeacher.js";
import TimeTable from "../models/TimeTable.js";
import PeriodSlot from "../models/PeriodSlot.js";

export const addSubject = async (req, res) => {
  try {
    const { name, classId, sectionId } = req.body;

    const subject = await Subject.create({ name, classId, sectionId });

    res.json({ success: true, subject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const assignTeacherToSubject = async (req, res) => {
  try {
    const { subjectId, teacherId } = req.body;

    const mapping = await SubjectTeacher.create({ subjectId, teacherId });

    res.json({ success: true, mapping });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const addPeriodSlot = async (req, res) => {
  try {
    const { periodNumber, startTime, endTime } = req.body;

    const slot = await PeriodSlot.create({
      periodNumber,
      startTime,
      endTime
    });

    res.json({ success: true, slot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const generateTimetable = async (req, res) => {
  try {
    const { classId, sectionId, day, periods } = req.body;
    /*
      periods = [
        { periodNumber: 1, subjectId: 5 },
        { periodNumber: 2, subjectId: 3 },
        ...
      ]
    */

    // Delete old timetable for the day
    await TimeTable.destroy({ where: { classId, sectionId, day } });

    for (let p of periods) {
      // Find assigned teacher
      const subjectMapping = await SubjectTeacher.findOne({
        where: { subjectId: p.subjectId }
      });

      if (!subjectMapping) {
        return res.status(400).json({ message: "Teacher not assigned to subject" });
      }

      const teacherId = subjectMapping.teacherId;

      // Check teacher availability
      const conflict = await TimeTable.findOne({
        where: { teacherId, day, periodNumber: p.periodNumber }
      });

      if (conflict) {
        return res.status(400).json({
          message: `Teacher already assigned in period ${p.periodNumber}`
        });
      }

      // Create timetable entry
      await TimeTable.create({
        classId,
        sectionId,
        day,
        periodNumber: p.periodNumber,
        subjectId: p.subjectId,
        teacherId
      });
    }

    res.json({ success: true, message: "Timetable generated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getClassTimetable = async (req, res) => {
  try {
    const { classId, sectionId, day } = req.params;

    const timetable = await TimeTable.findAll({
      where: { classId, sectionId, day },
      order: [["periodNumber", "ASC"]]
    });

    res.json({ success: true, timetable });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getTeacherTimetable = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const timetable = await TimeTable.findAll({
      where: { teacherId },
      order: [["day", "ASC"], ["periodNumber", "ASC"]]
    });

    res.json({ success: true, timetable });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

