import express from "express";
import { createExam, addMarks, getStudentResults,getExams,updateExam,deleteExam } from "../controllers/exam.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createExam);
router.post("/marks/add", verifyToken, addMarks);
router.get("/results/:studentId", verifyToken, getStudentResults);
router.get("/", verifyToken, getExams);
router.put("/update/:id", verifyToken, updateExam);
router.delete("/delete/:id", verifyToken, deleteExam);
export default router;
