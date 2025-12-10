import FeeStructure from "../../models/FeeStucture.js";
import FeeAssign from "../../models/FeeAssign.js";
import FeePayment from "../../models/FeePayment.js";
import { Op } from "sequelize";

// ---------------------------------------------------------
// GET PENDING FEES FOR A STUDENT
// ---------------------------------------------------------
export const getFeeDue = async (req, res) => {
  try {
    const { studentId } = req.params;

    const pending = await FeeAssign.findAll({
      where: { studentId, status: "pending" },
      include: [
        {
          model: FeeStructure,
          required: true
        }
      ]
    });

    return res.json({
      success: true,
      pending
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------------------------------------------
// GET FEE PAYMENT HISTORY
// ---------------------------------------------------------
export const getFeeHistory = async (req, res) => {
  try {
    const { studentId } = req.params;

    const history = await FeePayment.findAll({
      where: { studentId },
      order: [["createdAt", "DESC"]],
      include: [{ model: FeeStructure }]
    });

    return res.json({
      success: true,
      history
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------------------------------------------
// PAY FEES (DUMMY PAYMENT + MARK PAID)
// ---------------------------------------------------------
export const payFees = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { structureId } = req.body;

    // Check assignment exists
    const assigned = await FeeAssign.findOne({
      where: { studentId, structureId }
    });

    if (!assigned) {
      return res.status(404).json({ success: false, message: "Fee not assigned" });
    }

    // Check amount from structure
    const feeStructure = await FeeStructure.findOne({
      where: { id: structureId }
    });

    if (!feeStructure) {
      return res.status(404).json({ success: false, message: "Fee structure not found" });
    }

    // Mark as paid
    assigned.status = "paid";
    await assigned.save();

    // Create payment record
    const txnId = "TXN_" + Date.now();

    const payment = await FeePayment.create({
      studentId,
      structureId,
      amount: feeStructure.amount,
      txnId
    });

    return res.json({
      success: true,
      message: "Fee payment successful (DUMMY MODE)",
      txnId,
      payment
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
