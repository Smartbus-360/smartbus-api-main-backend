// models/ExtraCurricular.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ExtraCurricular = sequelize.define("ExtraCurricular", {
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
  activityType: {
    type: DataTypes.STRING, // Sports / Cultural / Olympiad etc
    allowNull: false
  },
  activityName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  achievementLevel: {
    type: DataTypes.STRING // School / District / State / National
  },
  remarks: {
    type: DataTypes.TEXT
  },
  photo: {
    type: DataTypes.STRING // file path
  },
  certificate: {
    type: DataTypes.STRING // file path
  }
});

export default ExtraCurricular;
