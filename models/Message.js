import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Message = sequelize.define("Message", {
  senderId: { type: DataTypes.INTEGER, allowNull: false },   // teacher/admin/parent
  receiverId: { type: DataTypes.INTEGER, allowNull: true }, // null for broadcast
  classId: { type: DataTypes.INTEGER, allowNull: true },     // broadcast target
  sectionId: { type: DataTypes.INTEGER, allowNull: true },
  message: { type: DataTypes.TEXT, allowNull: false },
  fileUrl: { type: DataTypes.STRING, allowNull: true },
  type: { type: DataTypes.STRING, allowNull: false, defaultValue: "direct" }, 
  // direct | broadcast
  seen: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: "messages",
});

export default Message;
