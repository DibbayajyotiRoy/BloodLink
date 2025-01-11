import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cookieParser from "cookie-parser";
import { bloodBankRoute } from "./routes/bloodBankRoute.js";
import { bloodDonorRoute } from "./routes/bloodDonorRoute.js";
// just a random comment
const app = express();
app.use(express.json());
app.use("/bloodbank", bloodBankRoute);
app.use("/blooddonor", bloodDonorRoute);

const PORT = process.env.PORT || 3000;

//Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try later",
  });
  
app.use("/api", limiter);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5100",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remember-token",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept",
    ],
  })
);

// Body Parser Middleware
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());


//Global Rate Limiting

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "ROUTE NOT AVAILABLE",
  });
});

const main = async()=>{
  try {
    const response = await mongoose.connect(process.env.MONGO_URI)
    if(response){
      console.log(response)
      console.log("mongodb working fine")
      app.listen(3000)
    }
  } catch (error) {
    console.log(error)
  }
}
main()