// models/FeeStructure.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FeeStructure = sequelize.define("FeeStructure", {
  classId: { type: DataTypes.INTEGER, allowNull: false },
  sectionId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "fee_structure" });

export default FeeStructure;
