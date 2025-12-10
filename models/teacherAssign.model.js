import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TeacherAssign = sequelize.define("tbl_sm360_teacher_assign", {
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  classId: { type: DataTypes.INTEGER, allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  instituteId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  timestamps: true
});

export default TeacherAssign;
