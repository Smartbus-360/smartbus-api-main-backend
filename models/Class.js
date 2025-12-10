import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ClassModel = sequelize.define("tbl_sm360_classes", {
  className: { type: DataTypes.STRING, allowNull: false },
  instituteId: { type: DataTypes.INTEGER, allowNull: false }
});

export default ClassModel;
