// import express from "express";
// import {
//   createSubject,
//   getSubjects,
//   updateSubject,
//   deleteSubject,
//   assignSubjectToTeacher,
//   getClassSubjects,
//   getTeacherSubjects
// } from "../controllers/subject.controller.js";
// import { httpAuth } from "../middleware/wsAuth.middleware.js";
// import { verifyToken } from "../utils/verifyUser.js";

// const router = express.Router();

// // SUBJECT CRUD
// router.post("/add",  createSubject);
// router.get("/",  getSubjects);
// router.put("/:id", verifyToken, updateSubject);
// router.delete("/:id", verifyToken, deleteSubject);

// // SUBJECT + TEACHER MAPPING
// router.post("/assign",  assignSubjectToTeacher);

// // GET SUBJECTS FOR CLASS & SECTION
// router.get("/class/:classId/section/:sectionId", verifyToken, getClassSubjects);

// // GET SUBJECTS ASSIGNED TO LOGGED-IN TEACHER
// router.get("/teacher/my-subjects", verifyToken, getTeacherSubjects);

// export default router;


import express from "express";
import {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  assignSubjectToTeacher,
  getClassSubjects,
  getTeacherSubjects
} from "../controllers/subject.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// SUBJECT CRUD
router.post("/add", verifyToken, createSubject);
router.get("/", verifyToken, getSubjects);
router.put("/:id", verifyToken, updateSubject);
router.delete("/:id", verifyToken, deleteSubject);

// SUBJECT + TEACHER MAPPING
router.post("/assign", verifyToken, assignSubjectToTeacher);

// GET SUBJECTS FOR CLASS & SECTION
router.get("/class/:classId/section/:sectionId", verifyToken, getClassSubjects);

// GET SUBJECTS ASSIGNED TO LOGGED-IN TEACHER
router.get("/teacher/my-subjects", verifyToken, getTeacherSubjects);

export default router;
