import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import TeacherAssign from "../models/teacherAssign.model.js";

export const addTeacher = async (req, res) => {
  try {
    const { full_name, email, phone, password, gender, classId, sectionId } = req.body;
    const instituteId = req.user.instituteId;

    if (!full_name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "full_name, email, phone, password are required"
      });
    }

    // Create username automatically
    let baseUsername = full_name.toLowerCase().replace(/\s+/g, "");
    let username = baseUsername;

    // Check if username exists, append number
    let count = 1;
    while (await User.findOne({ where: { username } })) {
      username = baseUsername + count;
      count++;
    }

    // Check duplicate email
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashed = bcrypt.hashSync(password, 10);

    const teacher = await User.create({
      full_name,
      username,
      email,
      phone,
      password: hashed,
      gender,
      classId,
      sectionId,
      instituteId,
      accountType: "staff",
      role: "viewer",
      isAdmin: 0,
      profilePicture:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    });

    return res.json({ success: true, teacher });

  } catch (err) {
    console.error("Add Teacher Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getAllTeachers = async (req, res) => {
  try {
    const instituteId = req.user.instituteId;

    const teachers = await User.findAll({
      where: {
        instituteId,
        accountType: "staff"
      },
      attributes: [
        "id", "full_name", "email", "phone", "gender",
        "profilePicture", "status", "createdAt"
      ]
    });

    return res.json({ success: true, teachers });

  } catch (err) {
    console.error("Get Teachers Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const updateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { full_name, email, phone, gender, status } = req.body;

    const teacher = await User.findOne({
      where: { id: teacherId, accountType: "staff" }
    });

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    await teacher.update({
      full_name,
      email,
      phone,
      gender,
      status
    });

    return res.json({ success: true, message: "Teacher updated successfully" });

  } catch (err) {
    console.error("Update Teacher Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const teacher = await User.findOne({
      where: { id: teacherId, accountType: "staff" }
    });

    if (!teacher)
      return res.status(404).json({ success: false, message: "Teacher not found" });

    await teacher.destroy();

    return res.json({ success: true, message: "Teacher deleted successfully" });

  } catch (err) {
    console.error("Delete Teacher Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const assignTeacher = async (req, res) => {
  try {
    const { teacherId, subjectId, classId, sectionId } = req.body;
    const instituteId = req.user.instituteId;

    if (!teacherId || !subjectId || !classId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "teacherId, subjectId, classId, and sectionId are required"
      });
    }

    const teacher = await User.findOne({
      where: { id: teacherId, instituteId }
    });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found in this institute"
      });
    }

    const record = await TeacherAssign.create({
      teacherId,
      subjectId,
      classId,
      sectionId,
      instituteId
    });

    return res.json({
      success: true,
      message: "Teacher assigned successfully",
      assignment: record
    });

  } catch (err) {
    console.error("Assign Teacher Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
