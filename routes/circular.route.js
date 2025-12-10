import express from "express";
import {
  createCircular,
  getCirculars,
  getCircularDetails
} from "../controllers/circular.controller.js";

const router = express.Router();

router.post("/create", createCircular);
router.get("/list", getCirculars);
router.get("/:id", getCircularDetails);

export default router;
