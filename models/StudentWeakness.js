// models/StudentWeakness.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const StudentWeakness = sequelize.define("StudentWeakness", {
  teacherId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  issue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  improvementNote: {
    type: DataTypes.TEXT
  }
});

export default StudentWeakness;
