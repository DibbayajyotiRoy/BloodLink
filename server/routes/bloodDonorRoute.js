import express from "express";
import { bloodDonorModel } from "../database/Schema/bloodDonor.js";
import z from "zod";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

const bloodDonorRoute = express.Router();

// Geocode location function
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
      console.error(`Geocoding failed for ${district}, ${state}`);
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
      state,
      district,
      bloodType,
      lastDonated,
      eligibility,
    } = req.body;

    // Validate input using Zod
    const requiredBody = z.object({
      name: z.string().min(3).max(100),
      email: z.string().min(3).max(100).email(),
      password: z.string().min(3).max(100),
      number: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
      state: z.string().min(2).max(100),
      district: z.string().min(2).max(100),
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
      state,
      district,
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
        address: { state: donor.state, district: donor.district },
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
    const { state, district, bloodType } = req.body;

    const inputSchema = z.object({
      state: z.string().min(2).max(100),
      district: z.string().min(2).max(100),
      bloodType: z.string().min(2).max(10),
    });

    const validation = inputSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid input data", details: validation.error });
    }

    // const userLocation = await geocodeLocation(district, state);
    // if (!userLocation) {
    //   return res.status(400).json({ error: "Invalid location. Unable to geocode." });
    // }

    const donors = await bloodDonorModel.find({
      bloodType,
    });

    console.log(donors)
    if (donors.length === 0) {
      return res.status(404).json({ message: "No donors found" });
    }

    res.status(200).json({ donors });
  } catch (error) {
    console.error("Error finding donors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { bloodDonorRoute };