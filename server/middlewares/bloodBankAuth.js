import { ApiError, catchAsync } from "./Error_Middleware/ExpressError.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "BloodLink"
export const bloodBankAuth = catchAsync(async (req, res, next) => {
  const token = req.Headers.token;

  if (!token) {
    throw new ApiError("You are not logged in", 401);
  }

  try {
    const decoded = await jwt.verify(token,JWT_SECRET);
    req.id = decoded.id;
    req.email = decoded.email
    next();
  } catch (error) {
    throw new ApiError("JWT Token error", 401);
  }
});