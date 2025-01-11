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

    const userLocation = await geocodeLocation(district, state);
    if (!userLocation) {
      return res.status(400).json({ error: "Invalid location. Unable to geocode." });
    }

    const donors = await bloodDonorModel.find({
      "address.state": state,
      "address.district": district,
      bloodType,
    });

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



























// import express from "express";
// import { bloodDonorModel } from "../database/Schema/bloodDonor.js";
// const bloodDonorRoute = express.Router();

// // Route to search for blood donors by blood group, state, and district
// bloodDonorRoute.post("/search-donors", async (req, res) => {
//     try {
//         const { bloodType, state, district } = req.body;

//         // Validate the input fields
//         if (!bloodType || !["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(bloodType)) {
//             return res.status(400).json({ message: "Invalid blood type. Please provide a valid blood group." });
//         }

//         if (!state || typeof state !== "string" || state.trim().length === 0) {
//             return res.status(400).json({ message: "Invalid state. Please provide a valid state." });
//         }

//         if (!district || typeof district !== "string" || district.trim().length === 0) {
//             return res.status(400).json({ message: "Invalid district. Please provide a valid district." });
//         }

//         // Query MongoDB to find donors who match the criteria
//         const donors = await bloodDonorModel.find({ bloodType, state, district });
//         console.log("Query Results:", donors); // Debugging line

//         // Check if donors are found
//         if (donors.length === 0) {
//             return res.status(404).json({ message: "No donors found for the specified criteria." });
//         }

//         // Respond with the list of matching donors
//         res.status(200).json({
//             message: `${donors.length} donors found for blood group ${bloodType} in ${district}, ${state}`,
//             donors: donors.map(donor => ({
//                 name: donor.name,
//                 email: donor.email,
//                 number: donor.number,
//                 bloodType: donor.bloodType,
//                 state: donor.state,
//                 district: donor.district,
//                 lastDonated: donor.lastDonated,
//                 eligibility: donor.eligibility,
//             })),
//         });

// import z from "zod";
// import fetch from "node-fetch";
// import bcrypt from 'bcrypt'
// const bloodDonorRoute = express.Router();


// // Route to sign up donors (unchanged)
// bloodDonorRoute.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password, number, state, district, eligibility, bloodType, lastDonated } = req.body;
//     const requiredBody = z.object({
//       name: z.string().min(3).max(100),
//       email: z.string().min(3).max(100).email(),
//       password: z.string().min(3).max(100),
//       number: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
//       state: z.string().min(2).max(100, "State must be between 2 and 100 characters"),
//       district: z.string().min(2).max(100, "District must be between 2 and 100 characters"),
      
//     });
//     const { success } = requiredBody.safeParse(req.body);

//     if (!success) {
//       console.log("Invalid Input");
//       res.status(404).json({
//         message: "Invalid input",
//       });
//       return;
//     }

//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const response = await bloodDonorModel.create({
//         name,
//         email,
//         password: hashedPassword,
//         number,
//         state,
//         district,
//         bloodType,
//         lastDonated,
//         eligibility,
//       });
//       console.log(response);
//       return res.status(201).json({
//         message: "Signup successful",
//         user: {
//           id: response._id,
//           name: response.name,
//           email: response.email,
//           password: response.password,
//           address: response.address,
//         },
//       });

//     } catch (error) {
//         console.error("Error fetching donors:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// });


// export { bloodDonorRoute };

// const geocodeLocation = async (district, state) => {
//   const geocodeURL = `https://nominatim.openstreetmap.org/search?district=${encodeURIComponent(
//     district
//   )}&state=${encodeURIComponent(state)}&country=USA&format=json`;

//   try {
//     const response = await fetch(geocodeURL);
//     const data = await response.json();
//     if (data && data.length > 0) {
//       const { lat, lon } = data[0];
//       return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
//     } else {
//       console.error(`Geocoding failed for , ${state}`);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error during geocoding:", error);
//     return null;
//   }
// };


// bloodDonorRoute.post("/find-donors", async (req, res) => {
//     console.log("Request received:", req.body);
  
//     try {
//       const { state, bloodType,district } = req.body;
  
//       const inputSchema = z.object({
//         state: z.string().min(2).max(100),
//         bloodType: z.string().min(2).max(10),
//       });
  
//       const validation = inputSchema.safeParse(req.body);
//       if (!validation.success) {
//         console.error("Invalid input:", validation.error);
//         return res.status(400).json({ error: "Invalid input data" });
//       }
//       const userLocation = await geocodeLocation( district, state);
//     if (!userLocation) {
//       return res.status(400).json({ error: "Invalid location. Unable to geocode." });
//     }
  
//       // Find donors matching the state and blood type
//       const donors = await bloodDonorModel.find({
//         "address.state": state,
//         bloodType,
//       });
  
//       if (donors.length === 0) {
//         return res.status(404).json({ message: "No donors found" });
//       }
  
//       res.status(200).json({ donors });
//     } catch (error) {
//       console.error("Error finding donors:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });
  
//   export { bloodDonorRoute };
  

































// import express from "express";
// import { bloodDonorModel } from "../database/Schema/bloodDonor.js";

// const bloodDonorRoute = express.Router();

// // Route to search for blood donors by blood group
// bloodDonorRoute.post("/search-donors", async (req, res) => {
//   try {
//       const { bloodType } = req.body;

//       if (!bloodType || !["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(bloodType)) {
//           return res.status(400).json({ message: "Invalid blood type. Please provide a valid blood group." });
//       }

//       const donors = await bloodDonorModel.find({ bloodType });
//       console.log("Query Results:", donors); // Debugging line

//       if (donors.length === 0) {
//           return res.status(404).json({ message: "No donors found for the specified blood group." });
//       }

//       res.status(200).json({
//           message: `${donors.length} donors found for blood group ${bloodType}`,
//           donors: donors.map(donor => ({
//               name: donor.name,
//               email: donor.email,
//               number: donor.number,
//               bloodType: donor.bloodType,
//               state: donor.state,
//               district: donor.district,
//               lastDonated: donor.lastDonated,
//               eligibility: donor.eligibility,
//           })),
//       });
//   } catch (error) {
//       console.error("Error fetching donors:", error);
//       res.status(500).json({ message: "Internal server error." });
//   }
// });
// export { bloodDonorRoute };
