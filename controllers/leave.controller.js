import Leave from "../models/Leave.js";

export const applyLeave = async (req, res) => {
  try {
    const { studentId, fromDate, toDate, reason } = req.body;

    const leave = await Leave.create({
      studentId,
      fromDate,
      toDate,
      reason,
    });

    res.json({
      success: true,
      message: "Leave request submitted",
      leave
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getLeaveStatus = async (req, res) => {
  try {
    const { studentId } = req.params;

    const leaves = await Leave.findAll({
      where: { studentId },
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getPendingLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll({
      where: { status: "pending" },
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const approveLeave = async (req, res) => {
  try {
    const { leaveId } = req.body;

    const leave = await Leave.findByPk(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = "approved";
    leave.approvedBy = req.user.id;

    await leave.save();

    res.json({ success: true, message: "Leave approved", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const rejectLeave = async (req, res) => {
  try {
    const { leaveId } = req.body;

    const leave = await Leave.findByPk(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = "rejected";
    leave.approvedBy = req.user.id;

    await leave.save();

    res.json({ success: true, message: "Leave rejected", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

