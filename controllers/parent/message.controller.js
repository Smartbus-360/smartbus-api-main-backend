import Message from "../../models/Message.js";
import User from "../../models/user.model.js";
import { Op } from "sequelize";

// ---------------------------------------------------------
// GET ALL MESSAGES FOR A PARENT (DIRECT + BROADCAST)
// ---------------------------------------------------------
export const getMessages = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1. Fetch student info
    const student = await User.findOne({ where: { id: studentId } });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    const { classId, sectionId } = student;

    // 2. Fetch messages
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { receiverId: studentId }, // direct messages to parent/student
          {
            type: "broadcast",
            classId,
            sectionId
          }
        ]
      },
      order: [["createdAt", "DESC"]]
    });

    return res.json({
      success: true,
      messages
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------------------------------------------
// PARENT REPLIES TO TEACHER (DIRECT MESSAGE)
// ---------------------------------------------------------
export const sendMessageReply = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { receiverId, message } = req.body;

    if (!receiverId || !message) {
      return res.status(400).json({
        success: false,
        message: "receiverId and message are required"
      });
    }

    // Sender is the parent (whose login token is used)
    const senderId = req.user.id;

    const msg = await Message.create({
      senderId,
      receiverId,
      message,
      type: "direct"
    });

    return res.json({
      success: true,
      message: msg
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------------------------------------------
// MARK MESSAGE AS SEEN
// ---------------------------------------------------------
export const markMessageSeen = async (req, res) => {
  try {
    const { messageId } = req.body;

    const msg = await Message.findByPk(messageId);

    if (!msg) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    msg.seen = true;
    await msg.save();

    return res.json({
      success: true,
      message: "Message marked as seen"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
