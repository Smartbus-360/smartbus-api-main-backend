import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

// GET PROFILE
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROFILE (NON-ADMIN)
export const updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update(updates);

    res.json({ success: true, message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CHANGE PASSWORD
export const changeMyPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = bcryptjs.compareSync(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    user.password = bcryptjs.hashSync(newPassword, 12);
    await user.save();

    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROFILE PICTURE (NON-ADMIN)
export const updateMyProfilePicture = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded" });

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePicture = req.file.path;
    await user.save();

    res.json({
      success: true,
      message: "Profile picture updated",
      url: req.file.path
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
