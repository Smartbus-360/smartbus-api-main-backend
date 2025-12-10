// models/FeeAssign.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FeeAssign = sequelize.define("FeeAssign", {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  structureId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" }, // pending, paid
}, { tableName: "fee_assign" });

export default FeeAssign;
