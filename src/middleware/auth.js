import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/errors.js";

export function verifyToken(req, res, next) {
  const authHeader = req.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new ApiError({ statusCode: httpStatus.UNAUTHORIZED }));
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return next(new ApiError({ statusCode: httpStatus.UNAUTHORIZED }));
  }
  return next();
}
