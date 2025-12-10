import Message from "../models/Message.js";
import User from "../models/user.model.js";


export const sendDirectMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    const data = await Message.create({
      senderId: req.user.id,
      receiverId,
      message,
      type: "direct"
    });

    res.json({ success: true, message: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const sendBroadcastMessage = async (req, res) => {
  try {
    const { classId, sectionId, message } = req.body;

    const data = await Message.create({
      senderId: req.user.id,
      classId,
      sectionId,
      message,
      type: "broadcast"
    });

    res.json({ success: true, message: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getInbox = async (req, res) => {
  try {
    const userId = req.user.id;

    const messages = await Message.findAll({
      where: {
        receiverId: userId
      },
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getBroadcastMessages = async (req, res) => {
  try {
    const { classId, sectionId } = req.params;

    const messages = await Message.findAll({
      where: {
        type: "broadcast",
        classId,
        sectionId
      },
      order: [["createdAt", "DESC"]]
    });

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const markSeen = async (req, res) => {
  try {
    const { messageId } = req.body;

    const msg = await Message.findByPk(messageId);
    if (!msg) return res.status(404).json({ message: "Message not found" });

    msg.seen = true;
    await msg.save();

    res.json({ success: true, message: "Marked as seen" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const broadcastToClass = async (req, res) => {
  try {
    const senderId = req.user.id;  // logged-in teacher
    const { classId, sectionId, title, message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    await Message.create({
      senderId,
      classId,
      sectionId,
      message: title + " - " + message, // optional formatting
      type: "broadcast",
    });

    return res.json({ success: true, message: "Broadcast sent successfully" });
  } catch (error) {
    console.error("Broadcast error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
