import express from "express";
import { bloodDonorModel } from "../database/Schema/bloodDonor.js";
import z from "zod";
import fetch from "node-fetch";
import geolib from "geolib";

const bloodDonorRoute = express.Router();


// Route to sign up donors (unchanged)
bloodDonorRoute.post("/signup", async (req, res) => {
  try {
    const { name, email, password, number, address, eligibility, bloodType, lastDonated } = req.body;
    const requiredBody = z.object({
      name: z.string().min(3).max(100),
      email: z.string().min(3).max(100).email(),
      password: z.string().min(3).max(100),
      number: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
      address: z.object({
        state: z.string().min(2).max(100, "State must be between 2 and 100 characters"),
        district: z.string().min(2).max(100, "District must be between 2 and 100 characters"),
      }),
    });
    const { success } = requiredBody.safeParse(req.body);

    if (!success) {
      console.log("Invalid Input");
      res.status(404).json({
        message: "Invalid input",
      });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await bloodDonorModel.create({
        name,
        email,
        password: hashedPassword,
        number,
        address,
        bloodType,
        lastDonated,
        eligibility,
      });
      console.log(response);
      return res.status(201).json({
        message: "Signup successful",
        user: {
          id: response._id,
          name: response.name,
          email: response.email,
          password: response.password,
          address: response.address,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "Data entry failed",
      });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({
      response: error,
    });
    return;
  }
});

// Helper function: Geocode a location
const geocodeLocation = async (district, state) => {
  const geocodeURL = `https://nominatim.openstreetmap.org/search?district=${encodeURIComponent(
    district
  )}&state=${encodeURIComponent(state)}&country=USA&format=json`;

  try {
    const response = await fetch(geocodeURL);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      console.error(`Geocoding failed for , ${state}`);
      return null;
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    return null;
  }
};

// Route to find donors
// Route to find donors
bloodDonorRoute.post("/find-donors", async (req, res) => {
    console.log("Request received:", req.body);
  
    try {
      const { state, bloodType,district } = req.body;
  
      // Validate input
      const inputSchema = z.object({
        state: z.string().min(2).max(100),
        bloodType: z.string().min(2).max(10),
      });
  
      const validation = inputSchema.safeParse(req.body);
      if (!validation.success) {
        console.error("Invalid input:", validation.error);
        return res.status(400).json({ error: "Invalid input data" });
      }
      const userLocation = await geocodeLocation( district, state);
    if (!userLocation) {
      return res.status(400).json({ error: "Invalid location. Unable to geocode." });
    }
  
      // Find donors matching the state and blood type
      const donors = await bloodDonorModel.find({
        "address.state": state,
        bloodType,
      });
  
      if (donors.length === 0) {
        return res.status(404).json({ message: "No donors found" });
      }
  
      // Respond with the list of donors
      res.status(200).json({ donors });
    } catch (error) {
      console.error("Error finding donors:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  export { bloodDonorRoute };
  
















// import express from 'express'
// import { bloodDonorModel } from '../database/Schema/bloodDonor.js'
// import bcrypt from 'bcrypt'
// import z from 'zod'
// // import jwt from 'jsonwebtoken'
// // const JWT_SECRET = 'BloodLink'
// const bloodDonorRoute = express.Router()


// bloodDonorRoute.post('/signup', async (req,res)=>{
//     try {
//         const {name, email, password, number, address, eligibility, bloodType, lastDonated} = req.body
//         const requiredBody = z.object({
//             name:z.string().min(3).max(100),   
//             email:z.string().min(3).max(100).email(),   
//             password:z.string().min(3).max(100),   
//             number: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),   
//             address: z.object({
//                 state: z.string().min(2).max(100, "State must be between 2 and 100 characters"),
//                 : z.string().min(2).max(100, "District must be between 2 and 100 characters"),
//             }),
//         })
//         const {success} = requiredBody.safeParse(req.body)

//         if(!success){
//             console.log("Invalid Input")
//             res.status(404).json({
//                 message:"Invalid input"
//             })
//             return
//         }

//         try {
//             const hashedPassword = await bcrypt.hash(password,10)
//             const response = await bloodDonorModel.create({
//                 name,
//                 email,
//                 password:hashedPassword,
//                 number,
//                 address,
//                 bloodType,
//                 lastDonated,
//                 eligibility
//             })
//             console.log(response)
//             return res.status(201).json({
//                 message: "Signup successful",
//                 user: {
//                     id: response._id,
//                     name: response.name,
//                     email: response.email,
//                     password: response.password,
//                     address: response.address,
//                 },
//             });
            
//         } catch (error) {
//             console.log(error)
//             res.status(404).json({
//                 message:"Data entry failed"
//             })
//             return
//         }
//     } catch (error) {
//         console.error(error)
//         res.status(404).json({
//             response:error
//         })
//         return
//     }
// })

// export {bloodDonorRoute}

