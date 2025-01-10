import mongoose from 'mongoose'

const bloodDonorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:[3,"Password is too short"]
    },
    number:{
        type:Number,
        unique:true,
        required:true,
        min:[10,"Enter your complete number"]
    },
    bloodType:{
        type:String,
        required:true,
        enum:["A+","A-","B+","B-","O+","O-","AB+","AB-"]
    },
    eligibility:{
        type:Boolean,
        required:true,
        default:false
    },
    lastDonated:{
        type:String,
        default:null
    },

    state:String,
    district:String,
    

    latitude: {
        type: Number,
        required: false,  // Not required on signup directly, will be populated via geocoding
    },
    longitude: {
        type: Number,
        required: false,  // Not required on signup directly, will be populated via geocoding
    }
})

const bloodDonorModel = mongoose.model("blooddonors",bloodDonorSchema)

export {bloodDonorModel}