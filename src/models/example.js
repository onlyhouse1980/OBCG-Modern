// models/example.js
import mongoose from 'mongoose';

const ExampleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: Number, required: true }
  },
  { timestamps: true }
);

// Prevent recompiling model in dev hot-reload
export default mongoose.models.Example || mongoose.model('Example', ExampleSchema);
