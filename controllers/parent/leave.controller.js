import Leave from "../../models/Leave.js";
import User from "../../models/user.model.js";

// ---------------------------------------------------------
// PARENT APPLIES FOR LEAVE
// ---------------------------------------------------------
export const applyLeave = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { fromDate, toDate, reason } = req.body;

    // Validate student
    const student = await User.findOne({ where: { id: studentId } });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const leave = await Leave.create({
      studentId,
      fromDate,
      toDate,
      reason,
      status: "pending"
    });

    return res.json({
      success: true,
      message: "Leave request submitted",
      leave
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------------------------------------------
// GET LEAVE HISTORY FOR PARENT
// ---------------------------------------------------------
export const getLeaveHistory = async (req, res) => {
  try {
    const { studentId } = req.params;

    const leaves = await Leave.findAll({
      where: { studentId },
      order: [["createdAt", "DESC"]]
    });

    return res.json({
      success: true,
      leaves
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
