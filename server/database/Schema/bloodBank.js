import mongoose from "mongoose";

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [3, "Password is too short"],
  },
  number: {
    type: String,
    unique: true,
    required: true,
    match: [/^\d{10}$/, "Enter a valid 10-digit phone number"],
  },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    }
  
});

const bloodBankModel = mongoose.model("BloodBank", bloodBankSchema);

export { bloodBankModel };
