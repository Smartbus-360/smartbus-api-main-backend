import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Subject = sequelize.define("Subject", {
  name: { type: DataTypes.STRING, allowNull: false },
  classId: { type: DataTypes.INTEGER, allowNull: true },
  instituteId: { type: DataTypes.INTEGER, allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: "subjects"
});

export default Subject;
