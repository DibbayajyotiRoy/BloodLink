import express from 'express'
import bcrypt from 'bcrypt'
import z from 'zod'
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'BloodLink'

import { bloodBankModel } from '../database/Schema/bloodBank.js'
// import {bloodBankAuth} from '../middlewares/bloodBankAuth.js'

const bloodBankRoute = express.Router()

bloodBankRoute.post('/signup', async (req,res)=>{
    try {
        const {name, email, password, number, address} = req.body
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
            const response = await bloodBankModel.create({
                name,
                email,
                password:hashedPassword,
                number,
                address
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
        const {email , password} = req.body
        const requiredBody = z.object({   
            email:z.string().min(3).max(100).email(),   
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
                email
            })
            const response = await bcrypt.compare(password , user.password)

            if(!response){
                console.log(response)
                res.status(404).json({
                    message:"Invalid email or"
                })
                return
            }

            const token = jwt.sign(
                { id: user._id, email: user.email },
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

// bloodBankRoute.post('/addblood', bloodBankAuth, async (req, res) =>{
    
// })

export {bloodBankRoute}