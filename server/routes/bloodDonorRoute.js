import express from "express";
import { bloodDonorModel } from "../database/Schema/bloodDonor.js";

const bloodDonorRoute = express.Router();

// Route to search for blood donors by blood group, state, and district
bloodDonorRoute.post("/search-donors", async (req, res) => {
    try {
        const { bloodType, state, district } = req.body;

        // Validate the input fields
        if (!bloodType || !["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(bloodType)) {
            return res.status(400).json({ message: "Invalid blood type. Please provide a valid blood group." });
        }

        if (!state || typeof state !== "string" || state.trim().length === 0) {
            return res.status(400).json({ message: "Invalid state. Please provide a valid state." });
        }

        if (!district || typeof district !== "string" || district.trim().length === 0) {
            return res.status(400).json({ message: "Invalid district. Please provide a valid district." });
        }

        // Query MongoDB to find donors who match the criteria
        const donors = await bloodDonorModel.find({ bloodType, state, district });
        console.log("Query Results:", donors); // Debugging line

        // Check if donors are found
        if (donors.length === 0) {
            return res.status(404).json({ message: "No donors found for the specified criteria." });
        }

        // Respond with the list of matching donors
        res.status(200).json({
            message: `${donors.length} donors found for blood group ${bloodType} in ${district}, ${state}`,
            donors: donors.map(donor => ({
                name: donor.name,
                email: donor.email,
                number: donor.number,
                bloodType: donor.bloodType,
                state: donor.state,
                district: donor.district,
                lastDonated: donor.lastDonated,
                eligibility: donor.eligibility,
            })),
        });
    } catch (error) {
        console.error("Error fetching donors:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

export { bloodDonorRoute };
































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
