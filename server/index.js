// To this
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import winston from 'winston';
import { bloodBankRoute } from "./routes/bloodBankRoute.js";
import { bloodDonorRoute } from "./routes/bloodDonorRoute.js";

// just a random comment
const app = express();
app.use(cors())
app.use(express.json());
app.use("/bloodbank", bloodBankRoute);
app.use("/blooddonor", bloodDonorRoute);
app.use("/donor-counts", bloodDonorRoute)

const PORT = process.env.PORT || 3000;

//CORS Configuration
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL || "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-Requested-With",
//       "device-remember-token",
//       "Access-Control-Allow-Origin",
//       "Origin",
//       "Accept",
//     ],
//   })
// );


// Body Parser Middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

//Global Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try later",
});

//Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use("/api", limiter);

// Initialize Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

// MongoDB connection function
const connectToDatabase = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    logger.info('MongoDB connected SUCCESSFULLY');
    return response;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw new Error('Database connection failed');
  }
};



// Main application function
const main = async () => {
  try {
    await connectToDatabase();
    
    // Start the Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
    
  } catch (error) {
    logger.error('Application startup error:', error);
    process.exit(1); // Exit the process with failure
  }
};

// Execute the main function
main();


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "ROUTE NOT AVAILABLE",
  });
});





























// const main = async () => {
//   try {
//     const response = await mongoose.connect(process.env.MONGO_URI);
//     if (response) {
//       console.log(response);
//       console.log("mongodb working fine");
//       app.listen(3000);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// main();
