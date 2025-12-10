import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Leave = sequelize.define("Leave", {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  fromDate: { type: DataTypes.DATEONLY, allowNull: false },
  toDate: { type: DataTypes.DATEONLY, allowNull: false },
  reason: { type: DataTypes.TEXT, allowNull: false },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending" // pending, approved, rejected
  },
  approvedBy: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: "leave_requests"
});

export default Leave;
