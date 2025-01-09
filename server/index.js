import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import { bloodBankRoute } from './routes/bloodBankRoute.js'
import { bloodDonorRoute } from './routes/bloodDonorRoute.js'

const app = express()
app.use(express.json())
app.use('/bloodbank',bloodBankRoute)
app.use('/blooddonor',bloodDonorRoute)

const port = process.env.PORT || 3000
const main = async ()=>{
    try {
        const response = await mongoose.connect('mongodb+srv://Nabhanil:lucifer17540@cluster0.6loge.mongodb.net/BloodLink')
        console.log(response)
        app.listen(port,()=>{
            console.log("server is listening on port:",port)
        })
    } catch (error) {
        console.log(error)
    }
}

main()