import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  generateRanking,
  getRanking
} from "../controllers/ranking.controller.js";

const router = express.Router();

// Admin only
router.post("/generate", verifyToken, generateRanking);

// Teacher / Student
router.get("/view", verifyToken, getRanking);

export default router;
