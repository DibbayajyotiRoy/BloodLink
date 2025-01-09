import express from 'express'
import { bloodDonorModel } from '../database/Schema/bloodDonor.js'
import bcrypt from 'bcrypt'
import z from 'zod'
// import jwt from 'jsonwebtoken'
// const JWT_SECRET = 'BloodLink'
const bloodDonorRoute = express.Router()


bloodDonorRoute.post('/signup', async (req,res)=>{
    try {
        const {name, email, password, number, address, eligibility, bloodType, lastDonated} = req.body
        const requiredBody = z.object({
            name:z.string().min(3).max(100),   
            email:z.string().min(3).max(100).email(),   
            password:z.string().min(3).max(100),   
            number: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),   
            address: z.object({
                state: z.string().min(2).max(100, "State must be between 2 and 100 characters"),
                district: z.string().min(2).max(100, "District must be between 2 and 100 characters"),
            }),
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
            const response = await bloodDonorModel.create({
                name,
                email,
                password:hashedPassword,
                number,
                address,
                bloodType,
                lastDonated,
                eligibility
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

export {bloodDonorRoute}