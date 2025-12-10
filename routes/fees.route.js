import express from "express";
import { 
  createFeeStructure,
  assignFee,
  getPendingFees,
  dummyPayFee,
  getFeeHistory
} from "../controllers/fees.controller.js";

const router = express.Router();

router.post("/create-structure", createFeeStructure);
router.post("/assign", assignFee);

router.get("/pending/:studentId", getPendingFees);
router.post("/pay/dummy", dummyPayFee);
router.get("/history/:studentId", getFeeHistory);

export default router;
