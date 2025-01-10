import { ApiError, catchAsync } from "./Error_Middleware/ExpressError.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "BloodLink"; // Replace with process.env.JWT_SECRET in production

export const bloodBankAuth = catchAsync(async (req, res, next) => {
  const token = req.headers.token; // Get the token from `req.headers.token`

  if (!token) {
    throw new ApiError("Token is missing. Please log in.", 401);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.id = decoded.id; // Attach the user ID to the request object
    req.email = decoded.email; // Attach the user email to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    throw new ApiError("Invalid or expired token. Please log in again.", 401);
  }
});
