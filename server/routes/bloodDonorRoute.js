import express from "express";
import { bloodDonorModel } from "../database/Schema/bloodDonor.js";
import z from "zod";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import jwt from 'jsonwebtoken';


const JWT_SECRET = "BloodLink"

const bloodDonorRoute = express.Router();

import { bloodBankModel } from "../database/Schema/bloodBank.js";

// Geocode location function
const geocodeLocation = async (subdivision, state) => {
  const geocodeURL = `https://nominatim.openstreetmap.org/search?subdivision=${encodeURIComponent(
    subdivision
  )}&state=${encodeURIComponent(state)}&country=USA&format=json`;

  try {
    const response = await fetch(geocodeURL);
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      console.error(`Geocoding failed for ${subdivision}, ${state}`);
      return null;
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    return null;
  }
};

// Route to sign up donors
bloodDonorRoute.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      number,
      subdivision,
      bloodType,
      lastDonated = Date.now,
      eligibility,
    } = req.body;

    // Validate input using Zod
    const requiredBody = z.object({
      name: z.string().min(3).max(100),
      email: z.string().min(3).max(100).email(),
      password: z.string().min(3).max(100),
      number: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
      subdivision: z.string().min(2).max(100),
    });

    const validation = requiredBody.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ message: "Invalid input", error: validation.error });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const donor = await bloodDonorModel.create({
      name,
      email,
      password: hashedPassword,
      number,
      subdivision,
      bloodType,
      lastDonated,
      eligibility,
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: donor._id,
        name: donor.name,
        email: donor.email,
        address: { state: donor.state, subdivision: donor.subdivision },
      },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to sign in donors
bloodDonorRoute.post('/signin', async (req,res)=>{
  try {
      const {name , password} = req.body
      console.log(name,password)
      const requiredBody = z.object({   
          name:z.string().min(3).max(100),   
          password:z.string().min(3).max(100),              
      })

      const {success} = requiredBody.safeParse(req.body)
      if(!success){
          console.log("Invalid Input")
          res.status(404).json({
              message:"Invalid input"
          })
          return
      }

      try {
          const user = await bloodDonorModel.findOne({
              name
          })
          const response = await bcrypt.compare(password , user.password)

          if(!response){
              console.log(response)
              res.status(404).json({
                  message:"Invalid name or password"
              })
              return
          }

          const token = jwt.sign(
              { id: user._id, name: user.name },
              JWT_SECRET 
          );

          return res.status(200).json({
              message: "Signin successful",
              token
          });

      } catch (error) {
          console.log(error)
          res.status(400).json({
              message:"Database server failed"
          })
      }

  } catch (error) {
      console.log(error)
      res.status(400).json({
          response:error
      })
      return
  }
})


// Route to find donors

bloodDonorRoute.post("/find-donors", async (req, res) => {
  try {
    const { state, subdivision, bloodType } = req.body;

    // Start constructing the query
    const query = {};

    // Only add filters if the respective fields are selected
    if (bloodType) {
      query.bloodType = bloodType;
    }

    if (state) {
      query.state = state;
    }

    if (subdivision) {
      query.subdivision = subdivision;
    }

    // Fetch donors based on the query
    const donors = await bloodDonorModel.find(query);

    // If no donors found, return a message
    if (donors.length === 0) {
      return res.status(404).json({ message: "No donors found" });
    }

    // Respond with the donors' data
    res.status(200).json({ donors });
  } catch (error) {
    console.error("Error finding donors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


bloodDonorRoute.post('/profile', async (req, res) => {
  try {
    // Extract the token from headers
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ error: 'Authorization token is required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET); // Replace 'your_secret_key' with your JWT secret

    // Extract the donor ID from the decoded token
    const donorId = decoded.id;

    if (!donorId) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Find the donor by ID
    const donor = await bloodDonorModel.findById(donorId);

    if (!donor) {
      return res.status(404).json({ error: 'Donor not found' });
    }

    // Send the response with donor details
    return res.status(200).json({
      name: donor.name,
      email: donor.email,
      bloodType: donor.bloodType,
      subdivision: donor.subdivision,
      number: donor.number,
      eligibility: donor.eligibility,
    });
  } catch (error) {
    console.error('Error fetching donor profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

bloodDonorRoute.put("/update", async (req, res) => {
  console.log(req.body)
  const {id,  name, email, number, bloodType, subdivision } = req.body; // Get data from the request body

  try {
    // Validate input data (optional, but recommended)
    if ( !name || !email || !number || !bloodType || !subdivision) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the donor by ID
    const donor = await bloodDonorModel.findById(id);

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    // Update donor's profile information
    donor.name = name;
    donor.email = email;
    donor.number = number;
    donor.bloodType = bloodType;
    donor.subdivision = subdivision;

    // Save the updated donor data
    await donor.save();

    res.status(200).json({ message: "Profile updated successfully", donor });
  } catch (err) {
    console.error("Error updating donor profile:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export { bloodDonorRoute };
