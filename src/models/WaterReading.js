// models/WaterReading.js
import mongoose from "mongoose";

const waterReadingSchema = new mongoose.Schema(
  {
    // Add fields that match the structure of your 'readings' collection
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    // Pass the exact name of your collecti
    collection: "readings",
  }
);

// The third argument, 'readings', tells Mongoose to use this specific collection name.
const WaterReading =
  mongoose.models.WaterReading ||
  mongoose.model("WaterReading", waterReadingSchema, "readings");

export default WaterReading;
