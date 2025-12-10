import Circular from "../models/Circular.js";

export const createCircular = async (req, res) => {
  try {
    const { title, description } = req.body;
    const fileUrl = req.file ? req.file.path : null;

    const data = await Circular.create({
      title,
      description,
      fileUrl,
      createdBy: req.user.id
    });

    res.json({ success: true, circular: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getCirculars = async (req, res) => {
  try {
    const list = await Circular.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, circulars: list });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getCircularDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const circular = await Circular.findByPk(id);

    if (!circular)
      return res.status(404).json({ message: "Circular not found" });

    res.json({ success: true, circular });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET all circulars for teacher
export const getAllCirculars = async (req, res) => {
  try {
    const circulars = await Circular.findAll({
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, circulars });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
