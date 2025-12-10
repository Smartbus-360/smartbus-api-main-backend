import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Circular = sequelize.define("Circular", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  fileUrl: { type: DataTypes.STRING, allowNull: true }, // PDF/Image
  createdBy: { type: DataTypes.INTEGER, allowNull: false }, // admin/teacher ID
}, {
  tableName: "circulars",
});

export default Circular;
