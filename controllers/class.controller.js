// controllers/class.controller.js
import Class from "../models/Class.js";
import Section from "../models/Section.js";

/* =============================
   CREATE CLASS
============================= */
export const createClass = async (req, res) => {
  try {
    const { instituteId } = req.user;  // 🔥 auto-fill from JWT
    const { className  } = req.body;

    if (!className || !instituteId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Prevent duplicate class in same institute
    const exists = await Class.findOne({ where: { className, instituteId } });
    if (exists) {
      return res.status(400).json({ success: false, message: "Class already exists" });
    }

    const newClass = await Class.create({ className, instituteId });

    res.json({ success: true, class: newClass });

  } catch (error) {
    console.log("Create Class Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =============================
   GET ALL CLASSES (WITH SECTIONS)
============================= */
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: [{ model: Section }]
    });

    res.json({ success: true, classes });

  } catch (error) {
    console.log("Get classes error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =============================
   UPDATE CLASS
============================= */
export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    const found = await Class.findByPk(id);
    if (!found) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }

    await found.update(req.body);

    res.json({ success: true, message: "Class updated", class: found });

  } catch (error) {
    console.log("Update class error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =============================
   DELETE CLASS
============================= */
export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const found = await Class.findByPk(id);
    if (!found) {
      return res.status(404).json({ success: false, message: "Class not found" });
    }

    await found.destroy();

    res.json({ success: true, message: "Class deleted" });

  } catch (error) {
    console.log("Delete class error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
