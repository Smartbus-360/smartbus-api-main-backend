import express from "express";
// import { verifyToken } from "../utils/verifyUser.js";
import { registerToken, sendNotification } from "../controllers/erp_notification.controller.js";
import { verifyErpUser } from "../utils/verifyErpUser.js";

const router = express.Router();

router.post("/register-token", verifyErpUser, registerToken);
router.post("/send", verifyErpUser, sendNotification);

export default router;
