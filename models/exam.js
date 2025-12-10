// import { DataTypes } from "sequelize";
// import sequelize from "../config/database.js";

// const Exam = sequelize.define("tbl_sm360_exams", {
//   examName: { type: DataTypes.STRING, allowNull: false },
//   classId: { type: DataTypes.INTEGER, allowNull: false },
//   sectionId: { type: DataTypes.INTEGER, allowNull: false },
//   date: { type: DataTypes.DATEONLY, allowNull: false },
// });

// export default Exam;

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Exam = sequelize.define("tbl_sm360_exams", {
  examName: { type: DataTypes.STRING, allowNull: false },
  classId: { type: DataTypes.INTEGER, allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
}, {
  timestamps: false   // 🚀 FIX ADDED HERE
});

export default Exam;
