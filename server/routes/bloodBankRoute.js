import express from 'express'
import bcrypt from 'bcrypt'
import z from 'zod'
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'BloodLink'
import mongoose from 'mongoose'

import { bloodBankModel } from '../database/Schema/bloodBank.js'
import { bloodQuantityModel } from '../database/Schema/bloodQuantity.js'
import {bloodBankAuth} from '../middlewares/bloodBankAuth.js'

const bloodBankRoute = express.Router()

bloodBankRoute.post('/signup', async (req,res)=>{
    try {
        const {name, email, password, number, state , district} = req.body
        const requiredBody = z.object({
            name:z.string().min(3).max(100),   
            email:z.string().min(3).max(100).email(),   
            password:z.string().min(3).max(100),   
            number: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),   
            state: z.string().min(2).max(100, "State must be between 2 and 100 characters"),
            district: z.string().min(2).max(100, "District must be between 2 and 100 characters")
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
            const hashedPassword = await bcrypt.hash(password,10)
            const response = await bloodBankModel.create({
                name,
                email,
                password:hashedPassword,
                number,
                state,
                district
            })
            console.log(response)
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
            console.log(error)
            res.status(404).json({
                message:"Data entry failed"
            })
            return
        }
    } catch (error) {
        console.error(error)
        res.status(404).json({
            response:error
        })
        return
    }
})

bloodBankRoute.post('/signin', async (req,res)=>{
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
            const user = await bloodBankModel.findOne({
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

bloodBankRoute.post('/find-banks', async (req,res)=>{
    const {subdivision} = req.body
    
    const query = {}

    if(subdivision){
        query.subdivision = subdivision
    }

    console.log(subdivision)
    console.log(query)

    const banks = await bloodBankModel.find(query)

    if (banks.length === 0) {
        return res.status(404).json({ message: "No banks found" });
      }
  
      // Respond with the banks' data
      res.status(200).json({ banks });
})

bloodBankRoute.post('/find-bank', async (req, res) => {
    const { id } = req.body;
    console.log(id);
    
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }
  
    try {
        // Check if the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
  
        // Fetch blood bank details
        const bloodBankDetails = await bloodBankModel.findById(id);
        if (!bloodBankDetails) {
            return res.status(404).json({ error: 'Blood bank not found' });
        }
  
        // Fetch blood quantities for this blood bank
        let bloodQuantities = await bloodQuantityModel.findOne({ bloodBank: id });
        if (!bloodQuantities) {
            // If no blood quantities are found, send default values (all quantities as 0)
            bloodQuantities = {
                quantities: {
                    A_positive: 0,
                    A_negative: 0,
                    B_positive: 0,
                    B_negative: 0,
                    O_positive: 0,
                    O_negative: 0,
                    AB_positive: 0,
                    AB_negative: 0
                },
                lastUpdated: new Date(),
            };
        }
  
        // Return both the blood bank details and the blood quantities
        return res.status(200).json({ bloodBankDetails, bloodQuantities });
    } catch (error) {
        console.error('Error fetching blood bank details:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

  


// Route to add or update blood quantities
bloodBankRoute.post("/add-bloods", bloodBankAuth, async (req, res) => {
  const {
    A_positive,
    A_negative,
    B_positive,
    B_negative,
    O_positive,
    O_negative,
    AB_positive,
    AB_negative,
  } = req.body;

  const bloodBankId = req.id; // `bloodBankAuth` middleware attaches this ID to `req.id`

  try {
    // Check if a record for this blood bank already exists
    const existingRecord = await bloodQuantityModel.findOne({ bloodBank: bloodBankId });

    if (existingRecord) {
      // Update existing quantities
      existingRecord.quantities = {
        A_positive,
        A_negative,
        B_positive,
        B_negative,
        O_positive,
        O_negative,
        AB_positive,
        AB_negative,
      };
      existingRecord.lastUpdated = Date.now();

      await existingRecord.save();
      return res.status(200).send({ message: "Blood quantities updated successfully." });
    }

    // Create a new record if it doesn't exist
    const newRecord = new bloodQuantityModel({
      bloodBank: bloodBankId,
      quantities: {
        A_positive,
        A_negative,
        B_positive,
        B_negative,
        O_positive,
        O_negative,
        AB_positive,
        AB_negative,
      },
    });

    await newRecord.save();
    res.status(201).send({ message: "Blood quantities added successfully." });
  } catch (error) {
    console.error("Error in /add-bloods:", error);
    res.status(500).send({ error: "An error occurred while processing your request." });
  }
});


export {bloodBankRoute}