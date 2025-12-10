import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TimeTable = sequelize.define("tbl_sm360_timetable", {
  classId: { type: DataTypes.INTEGER, allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  teacherId: { type: DataTypes.INTEGER, allowNull: false },
  day: { type: DataTypes.ENUM("Mon", "Tue", "Wed", "Thu", "Fri", "Sat"), allowNull: false },
  periodNumber: { type: DataTypes.INTEGER, allowNull: false },
  startTime: { type: DataTypes.TIME },
  endTime: { type: DataTypes.TIME }
});

export default TimeTable;
