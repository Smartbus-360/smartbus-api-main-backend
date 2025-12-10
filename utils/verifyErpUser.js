import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyErpUser = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // contains id, email, username
    next();
  } catch (error) {
    return next(errorHandler(401, "Unauthorized: Invalid token"));
  }
};
