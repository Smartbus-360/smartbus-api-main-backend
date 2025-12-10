// import { DataTypes } from "sequelize";
// import sequelize from "../config/database.js";

// const FcmToken = sequelize.define("tbl_sm360_fcm_tokens", {
//   userId: { type: DataTypes.INTEGER, allowNull: false },
//   deviceToken: { type: DataTypes.TEXT, allowNull: false }
// });

// export default FcmToken;

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FcmToken = sequelize.define(
  "FcmToken",
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    deviceToken: { type: DataTypes.TEXT, allowNull: false }
  },
  {
    tableName: "tbl_sm360_fcm_tokens",
    timestamps: false   // 👈 FIX — stops Sequelize from requiring createdAt/updatedAt
  }
);

export default FcmToken;
