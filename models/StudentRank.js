// models/StudentRank.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const StudentRank = sequelize.define("StudentRank", {
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
  totalMarks: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  examId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  publishedBy: {
    type: DataTypes.INTEGER // admin id
  }
});

export default StudentRank;
