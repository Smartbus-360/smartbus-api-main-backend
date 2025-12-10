import express from "express";
import {
  sendDirectMessage,
  sendBroadcastMessage,
  getInbox,
  getBroadcastMessages,
  markSeen
} from "../controllers/message.controller.js";

const router = express.Router();

// Send Messages
router.post("/send/direct", sendDirectMessage);
router.post("/send/broadcast", sendBroadcastMessage);

// View Messages
router.get("/inbox", getInbox);
router.get("/broadcast/:classId/:sectionId", getBroadcastMessages);

// Mark as Seen
router.post("/Seen", markSeen);

export default router;
