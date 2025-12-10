import FeeStructure from "../models/FeeStucture.js";
import FeeAssign from "../models/FeeAssign.js";
import FeePayment from "../models/FeePayment.js";

export const createFeeStructure = async (req, res) => {
  try {
    const { classId, sectionId, title, amount } = req.body;

    const data = await FeeStructure.create({ classId, sectionId, title, amount });

    res.json({ success: true, fee: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const assignFee = async (req, res) => {
  try {
    const { studentId, structureId } = req.body;

    const data = await FeeAssign.create({ studentId, structureId });

    res.json({ success: true, assigned: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getPendingFees = async (req, res) => {
  try {
    const { studentId } = req.params;

    const pending = await FeeAssign.findAll({
      where: { studentId, status: "pending" },
      include: [{ model: FeeStructure }]
    });

    res.json({ success: true, pending });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const dummyPayFee = async (req, res) => {
  try {
    const { studentId, structureId } = req.body;

    const fee = await FeeAssign.findOne({ where: { studentId, structureId } });
    if (!fee) return res.status(404).json({ message: "Fee not assigned" });

    // Mark as paid
    fee.status = "paid";
    await fee.save();

    // Add dummy payment record
    const txnId = "DUMMY_TXN_" + Date.now();

    const payment = await FeePayment.create({
      studentId,
      structureId,
      amount: fee.amount,
      txnId
    });

    res.json({
      success: true,
      message: "Fee paid successfully (DUMMY)",
      payment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getFeeHistory = async (req, res) => {
  try {
    const { studentId } = req.params;

    const history = await FeePayment.findAll({
      where: { studentId },
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
