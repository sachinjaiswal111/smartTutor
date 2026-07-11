import jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError.js";

export const authenticate = (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};