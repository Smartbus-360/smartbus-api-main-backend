// // 
// import { DataTypes } from "sequelize";
// import sequelize from "../config/database.js";

// const SubjectTeacher = sequelize.define("subject_teacher_map", {
//   subjectId: { type: DataTypes.INTEGER, allowNull: false },
//   teacherId: { type: DataTypes.INTEGER, allowNull: false },
//   classId: { type: DataTypes.INTEGER, allowNull: false },   // ADD THIS
//   sectionId: { type: DataTypes.INTEGER, allowNull: false }  // ADD THIS
// }, {
//   tableName: "subject_teacher_map"
// });

// export default SubjectTeacher;

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const SubjectTeacher = sequelize.define("subject_teacher_map", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  teacherId: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },

  subjectId: { 
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
  }
}, {
  tableName: "subject_teacher_map",
  timestamps: true
});

export default SubjectTeacher;
