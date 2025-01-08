import mongoose from "mongoose";

const bloodQuantitySchema = new mongoose.Schema({
  bloodBank: {
    type: mongoose.Types.ObjectId,
    ref: "BloodBank",
    required: true,
  },
  quantities: {
    A_positive: {
      type: Number,
      required: true,
      default: 0,
    },
    A_negative: {
      type: Number,
      required: true,
      default: 0,
    },
    B_positive: {
      type: Number,
      required: true,
      default: 0,
    },
    B_negative: {
      type: Number,
      required: true,
      default: 0,
    },
    O_positive: {
      type: Number,
      required: true,
      default: 0,
    },
    O_negative: {
      type: Number,
      required: true,
      default: 0,
    },
    AB_positive: {
      type: Number,
      required: true,
      default: 0,
    },
    AB_negative: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const bloodQuantityModel = mongoose.model("BloodQuantities", bloodQuantitySchema);

export { bloodQuantityModel };
