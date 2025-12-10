// controllers/section.controller.js
import Section from "../models/Section.js";
import Class from "../models/Class.js";

/* =============================
   CREATE SECTION
============================= */
export const createSection = async (req, res) => {
  try {
        const { instituteId } = req.user;  // 🔥 auto-fill from JWT
    const { classId, sectionName } = req.body;

    if (!classId || !sectionName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Class must exist
    const classExists = await Class.findByPk(classId);
    if (!classExists) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }

    // Prevent duplicate section
    const exists = await Section.findOne({ where: { classId, sectionName } });
    if (exists) {
      return res.status(400).json({ success: false, message: "Section already exists for this class" });
    }

    const section = await Section.create({ classId, sectionName,instituteId });

    res.json({ success: true, section });

  } catch (error) {
    console.log("Create section error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =============================
   GET SECTIONS BY CLASS
============================= */
export const getSectionsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const sections = await Section.findAll({
      where: { classId }
    });

    res.json({ success: true, sections });

  } catch (error) {
    console.log("Get sections error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =============================
   UPDATE SECTION
============================= */
export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    await section.update(req.body);

    res.json({ success: true, message: "Section updated", section });

  } catch (error) {
    console.log("Update section error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/* =============================
   DELETE SECTION
============================= */
export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByPk(id);
    if (!section) {
      return res.status(404).json({ success: false, message: "Section not found" });
    }

    await section.destroy();

    res.json({ success: true, message: "Section deleted" });

  } catch (error) {
    console.log("Delete section error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
