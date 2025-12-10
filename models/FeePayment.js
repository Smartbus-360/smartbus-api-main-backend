// models/FeePayment.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FeePayment = sequelize.define("FeePayment", {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  structureId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  txnId: { type: DataTypes.STRING, allowNull: false },
}, { tableName: "fee_payment" });

export default FeePayment;
