// import jwt from "jsonwebtoken";
// import crypto from "crypto"; // Import for hashing
// import { errorHandler } from "./error.js";
// import sequelize from "../config/database.js";

// export const verifyToken = async (req, res, next) => {
//   let token = req.cookies.token || req.headers.authorization;

//   if (token && token.startsWith("Bearer ")) {
//     token = token.slice(7, token.length);
//   }

//   if (!token) {
//     return next(errorHandler(401, "Unauthorized: No token provided"));
//   }

//   jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
//     if (err) {
//       console.log("Access token expired or invalid. Checking refresh token...");

//       const refreshToken = req.cookies.refreshToken;
//       if (!refreshToken) {
//         return next(errorHandler(401, "Unauthorized: Refresh token missing"));
//       }

//       // Hash the received refresh token
//       const encryptedToken = crypto.createHmac("sha256", process.env.REFRESH_SECRET)
//                                    .update(refreshToken)
//                                    .digest("hex");

//       // Check if the hashed refresh token exists in the database
//       const [dbUser] = await sequelize.query(
//         `SELECT id, isAdmin FROM tbl_sm360_users WHERE refreshToken = ?`,
//         { replacements: [encryptedToken], type: sequelize.QueryTypes.SELECT }
//       );

//       if (!dbUser) {
//         return next(errorHandler(403, "Forbidden: Invalid refresh token"));
//       }

//       // Generate a new access token
//       const newAccessToken = jwt.sign(
//         { id: dbUser.id, isAdmin: dbUser.isAdmin },
//         process.env.JWT_SECRET,
//         { expiresIn: "8h" }
//       );

//       console.log("New access token generated:", newAccessToken);

//       // Attach the new token to the request object
//       req.user = { id: dbUser.id, isAdmin: dbUser.isAdmin, newAccessToken };

//       // Set new token in response headers (for frontend to capture)
//       res.setHeader("Authorization", `Bearer ${newAccessToken}`);

//       return next(); // Proceed to the next middleware (e.g., `getInstitutes`)
//     }

//     req.user = user;
//     next();
//   });
// };


import jwt from "jsonwebtoken";
import crypto from "crypto";
import { errorHandler } from "./error.js";
import sequelize from "../config/database.js";

export const verifyToken = async (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  if (!token) {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }

  // Try verifying access token first
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedUser) => {
    if (!err) {
      // ⭐ Access token is valid
      req.user = {
        id: decodedUser.id,
        accountType: decodedUser.accountType || null,
        isAdmin: decodedUser.isAdmin || 0,
        instituteId: decodedUser.instituteId || null
      };
      return next();
    }

    // -----------------------------
    // ACCESS TOKEN INVALID → TRY REFRESH TOKEN
    // -----------------------------
    console.log("Access token expired. Validating refresh token...");

    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return next(errorHandler(401, "Unauthorized: Refresh token missing"));
    }

    // Hash refresh token
    const encryptedToken = crypto
      .createHmac("sha256", process.env.REFRESH_SECRET)
      .update(refreshToken)
      .digest("hex");

    // Validate refresh token in DB
    const [dbUser] = await sequelize.query(
      `SELECT id, isAdmin, accountType FROM tbl_sm360_users WHERE refreshToken = ? LIMIT 1`,
      {
        replacements: [encryptedToken],
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!dbUser) {
      return next(errorHandler(403, "Forbidden: Invalid refresh token"));
    }

    // Generate NEW ACCESS TOKEN
    const newAccessToken = jwt.sign(
      {
        id: dbUser.id,
        isAdmin: dbUser.isAdmin,
        accountType: dbUser.accountType,
        instituteId: dbUser.instituteId
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Attach to request object
    req.user = {
      id: dbUser.id,
      isAdmin: dbUser.isAdmin,
      accountType: dbUser.accountType,
      instituteId:dbUser.instituteId,
      newAccessToken
    };

    // Send token to frontend
    res.setHeader("Authorization", `Bearer ${newAccessToken}`);

    return next();
  });
};
