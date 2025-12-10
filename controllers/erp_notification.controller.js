import FcmToken from "../models/FcmToken.js";
import admin from "firebase-admin";

// Save Device Token
export const registerToken = async (req, res) => {
  try {
    const { deviceToken } = req.body;

    if (!deviceToken)
      return res.status(400).json({ message: "Device token missing" });

    await FcmToken.create({
      userId: req.user.id,
      deviceToken
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Send Notification
export const sendNotification = async (req, res) => {
  try {
    const { title, body, userId } = req.body;

    const tokens = await FcmToken.findAll({ where: { userId } });

    if (tokens.length === 0)
      return res.json({ success: true, message: "No tokens found" });

    const payload = { notification: { title, body } };

    for (let t of tokens) {
      await admin.messaging().sendToDevice(t.deviceToken, payload);
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
