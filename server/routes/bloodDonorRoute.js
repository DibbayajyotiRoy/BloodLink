import express from "express";
import { bloodDonorModel } from "../database/Schema/bloodDonor.js";
import z from "zod";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

const bloodDonorRoute = express.Router();

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



export { bloodDonorRoute };
