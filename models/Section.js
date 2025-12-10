import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Section = sequelize.define("tbl_sm360_sections", {
  classId: { type: DataTypes.INTEGER, allowNull: false },
  sectionName: { type: DataTypes.STRING, allowNull: false },
  instituteId: { type: DataTypes.INTEGER, allowNull: false }

});

export default Section;
