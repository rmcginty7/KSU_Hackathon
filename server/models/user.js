const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  userName:     { type: String, required: true, unique: true }, // Username
  name:         { type: String, required: true }, // name
  email:        { type: String, required: true, unique: true },  // email
  passwordHash: { type: String, required: true }, // password (HASHED)
  dob:          { type: Date, required: false }, // date of birth (OPTIONAL)
  createdAt:    { type: Date, default: Date.now }, // creation date
  profile: {
    age:         Number,
    weight:      Number,
    height:      Number,
    fitnessGoal: { type: String, enum: ['lose_weight', 'build_muscle', 'maintain'] }
  }
});

module.exports = model('User', userSchema);