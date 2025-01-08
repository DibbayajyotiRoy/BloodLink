import mongoose from "mongoose";

const bloodOrderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type:{
            state:String,
            District:String
        }
    },
    timeOfPurchase:{
        type:Date,
        default:Date.now
    },
    bloodType:{
        type:String,
        required:true
    },
    orderFromBloodBank:{
        type:mongoose.Types.ObjectId,
        ref:bloodbanks
    }
})

const bloodOrderModel = mongoose.model("bloodorders",bloodOrderSchema)

export {bloodOrderModel}