import express from "express";
import {
  applyLeave,
  getLeaveStatus,
  getPendingLeaves,
  approveLeave,
  rejectLeave
} from "../controllers/leave.controller.js";

const router = express.Router();

router.post("/apply", applyLeave);
router.get("/status/:studentId", getLeaveStatus);

router.get("/pending", getPendingLeaves);
router.post("/approve", approveLeave);
router.post("/reject", rejectLeave);

export default router;
