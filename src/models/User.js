import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Prevents duplicate email addresses
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true, // Prevents duplicate usernames
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  // Array of ObjectIds to link to WaterReading documents
  readingIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WaterReading', // This links to the WaterReading model
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Pre-save hook to hash the password before saving a new user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;