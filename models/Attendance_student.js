import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AttendanceStudent = sequelize.define(
  "tbl_sm360_attendance_student",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    studentId: { type: DataTypes.INTEGER, allowNull: false },

    classId: { type: DataTypes.INTEGER, allowNull: false },

    sectionId: { type: DataTypes.INTEGER, allowNull: false },

    date: { type: DataTypes.DATEONLY, allowNull: false },

    status: { type: DataTypes.STRING, allowNull: false },

    markedBy: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "tbl_sm360_attendance_students",
  }
);

export default AttendanceStudent;   // ✅ ADD THIS LINE
