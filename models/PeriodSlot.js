// 
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PeriodSlot = sequelize.define("PeriodSlot", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  classId: { type: DataTypes.INTEGER, allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  subjectId: { type: DataTypes.INTEGER, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },

  periodNumber: { type: DataTypes.INTEGER, allowNull: false },
  startTime: { type: DataTypes.STRING, allowNull: false },
  endTime: { type: DataTypes.STRING, allowNull: false },

  day: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "period_slots"
});

export default PeriodSlot;
