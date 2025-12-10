import express from "express";
import { verifyToken } from "../utils/verifyUser.js";

import {
  createHomework,
  getTeacherHomework,
  updateHomework,
  deleteHomework
} from "../controllers/homework.controller.js";

const router = express.Router();

// CREATE HOMEWORK
router.post("/create", verifyToken, createHomework);

// GET LIST OF HOMEWORK BY TEACHER
router.get("/:teacherId", verifyToken, getTeacherHomework);

// UPDATE HOMEWORK
router.put("/update/:id", verifyToken, updateHomework);

// DELETE HOMEWORK
router.delete("/delete/:id", verifyToken, deleteHomework);

export default router;
