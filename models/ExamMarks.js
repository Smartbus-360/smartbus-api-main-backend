// 
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ExamMarks = sequelize.define(
  "tbl_sm360_exam_marks",
  {
    examId: { type: DataTypes.INTEGER, allowNull: false },
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    marksObtained: { type: DataTypes.FLOAT, allowNull: false },
    maxMarks: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    timestamps: false, // 🚀🚀 Fix for "Unknown column updatedAt"
  }
);

export default ExamMarks;
