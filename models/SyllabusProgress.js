// models/SyllabusProgress.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SyllabusProgress = sequelize.define("SyllabusProgress", {
  teacherId: {
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
    allowNull: false
  },
  chapterName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("not_started", "in_progress", "completed"),
    defaultValue: "not_started"
  },
  coveredDate: {
    type: DataTypes.DATEONLY
  },
  remarks: {
    type: DataTypes.TEXT
  }
});

export default SyllabusProgress;
