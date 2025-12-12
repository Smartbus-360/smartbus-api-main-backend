import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addSyllabusProgress,
  getSyllabusProgress
} from "../controllers/syllabusProgress.controller.js";

const router = express.Router();

router.post("/add", verifyToken, addSyllabusProgress);
router.get("/list", verifyToken, getSyllabusProgress);

export default router;
