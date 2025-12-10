import express from "express";
import { teacherLogin } from "../controllers/teacher.controller.js";

const router = express.Router();

router.post("/login", teacherLogin);

export default router;
