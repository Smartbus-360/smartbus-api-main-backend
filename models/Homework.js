import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Homework = sequelize.define("tbl_sm360_homework", {
  classId: { type: DataTypes.INTEGER, allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  subject: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  fileUrl: { type: DataTypes.TEXT },
  priority: { type: DataTypes.ENUM("low", "medium", "high"), defaultValue: "low" },
dueDate: {
  type: DataTypes.DATEONLY,
  allowNull: false
},
  createdBy: { type: DataTypes.INTEGER, allowNull: false }
});

export default Homework;
